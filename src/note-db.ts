import * as vscode from 'vscode';
import * as fs from 'fs';

import { annotationFilePrefix, getAnnotationFilePath, getConfiguration, getStorageLocatiion, getUserName } from './configuration';
import { setDecorations } from './decoration/decoration';
import { v4 as uuidv4 } from 'uuid';

import path = require('path');

export interface Position {
    line: number;
    character: number;
}

export interface Note {
    userName: string;
    fileName: string;
    fileLine: number;
    positionStart: Position;
    positionEnd: Position;
    text: string;
    codeSnippet: string;
    status: 'pending' | 'done';
    id: string;
    createdAt: Date;
    resolvedAt: Date | undefined;
}

export interface NotesDb {
    notes: Note[];
    nextId: string;
}

export const getNotesDb = (): NotesDb => {
    /*const annotationFile = getAnnotationFilePath();
    const rawdata = fs.readFileSync(annotationFile, 'utf8');
    let annotations = JSON.parse(rawdata);
    return annotations;*/

    const allNotes: Note[] = [];
    const userFiles = fs.readdirSync(getStorageLocatiion());

    for (const userFile of userFiles) {
        if (userFile.startsWith(annotationFilePrefix)) {
            const filePath = path.join(getStorageLocatiion(), userFile);
            const rawdata = fs.readFileSync(filePath, 'utf-8');
            let userNotes = JSON.parse(rawdata);
            allNotes.push(...userNotes.notes);
        }
    }
    let nextId = getNextId();
    return { notes: allNotes, nextId };
};

export const getNotes = (): Note[] => {
    return getNotesDb().notes;
};

export const getNextId = (): string => {
//    return getNotesDb().nextId;
    const randomUUID: string = uuidv4();
    return randomUUID;
};

export const saveDb = (db: NotesDb) => {
    const filteredNotes: Note[] = db.notes.filter(note => note.userName === getUserName());
    const data = JSON.stringify({notes: filteredNotes, nextId: db.nextId});
    fs.writeFileSync(getAnnotationFilePath(), data);
    vscode.commands.executeCommand('code-annotation.refreshEntry');
};

export const saveNotes = (notes: Note[]) => {
    let db = getNotesDb();

    // Replace notes by the one passed
    db.notes = notes;

    // Save Db in JSON file
    saveDb(db);
};

const createNote = (annotationText: string, fromSelection: boolean) => {
    const nextId = getNextId();

    let codeSnippet = '';
    let fileName = '';
    let selection = undefined;
    let positionStart: Position = {line: 0, character: 0};
    let positionEnd: Position = {line: 0, character: 0};
    let userName = '';

    userName = getUserName();

    const editor = vscode.window.activeTextEditor;
    if (fromSelection && editor) {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        let relativePath = '';
        if (workspaceFolders && workspaceFolders.length > 0) {
            const projectRoot = workspaceFolders[0].uri.fsPath;
            relativePath = path.relative(projectRoot, editor.document.uri.fsPath);
        }
        fileName = relativePath;
        selection = editor.selection;
        if (selection) {
            codeSnippet = editor.document.getText(selection);
            positionStart = { line: selection.start.line, character: selection.start.character };
            positionEnd = { line: selection.end.line, character: selection.end.character };
        }
    }
    const note: Note = {
        userName: userName,
        fileName: fileName,
        fileLine: selection ? selection.start.line : 0,
        positionStart: positionStart,
        positionEnd: positionEnd,
        text: annotationText,
        codeSnippet: codeSnippet,
        status: 'pending',
        id: nextId,
        createdAt: new Date(),
        resolvedAt: undefined
    };
    return note;
};

const createNoteFromSelection = (annotationText: string) => {
    return createNote(annotationText, true);
};

const createPlainNote = (annotationText: string) => {
    return createNote(annotationText, false);
};

const addNoteToDb = (note: Note) => {
    let db = getNotesDb();

    db.notes.push(note);
    //db.nextId++;

    saveDb(db);
    vscode.window.showInformationMessage('Annotation saved!');
};

const getTODOFromSelectedText = (): string | undefined => {
    const editor = vscode.window.activeTextEditor;
    const selectedText = editor?.selection ? editor.document.getText(editor.selection) : '';
    const todoSelector = /\/\/\s*(TODO|FIX):\s*(.*)/;
    let matchArray = selectedText.match(todoSelector);
    if (matchArray && matchArray.length) {
        return matchArray[2];
    }
    for (const custom of getConfiguration().customTODO) {
        try {
            const customMatch = selectedText.match(custom);
            if (customMatch && customMatch.length) {
                // Use the second group to be consistent with the standard regex above
                if (!customMatch[2]) {
                    vscode.window.showWarningMessage(`Custom TODO RegEx (${custom}) doesn't have atleast two capture groups`);
                } else {
                    return customMatch[2];
                }
            }
        } catch (e) {
            vscode.window.showErrorMessage(`Error checking custom regex '${custom}'`);
            continue;
        }
    }
    return undefined;
};

const getPlaceHolderLineFromText = (): string | undefined => {
    const todoText = getTODOFromSelectedText();
    if (todoText)
    { return todoText; }

    // If there's no todo, use the first line from the text
    const editor = vscode.window.activeTextEditor;
    let selectedText = editor?.selection ? editor.document.getText(editor.selection) : '';
    return selectedText.split(/\r?\n/)[0].trim();
};

export const addNote = async () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
        const todoText = getPlaceHolderLineFromText();
        let annotationText = await vscode.window.showInputBox({ placeHolder: 'Give the annotation some text...', value: todoText });
        if (annotationText) {
            addNoteToDb(createNoteFromSelection(annotationText));
        }
    }
    setDecorations();
};

export const addPlainNote = async () => {
    const annotationText = await vscode.window.showInputBox({ placeHolder: 'Give the annotation some text...' });
    if (annotationText) {
        addNoteToDb(createPlainNote(annotationText));
    }
};