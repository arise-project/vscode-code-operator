<div align="center">
  <img src="resources/code-annotation.png" alt="Code Annotation Logo" height="100"> <h1>Code Annotation</h1>
</div>

Create and track annotations from your source code without actually committing comments on your code.

![](https://github.com/thamara/vscode-code-annotation/blob/main/demo/Code%20Annotation.png)

The "Code Annotation" can be found in the Activity pane.

## Features

- Create an annotation from the source code, selecting the portion of code, right-clicking and adding a note
- Keybinds for creating a new note from selection (`Ctrl/Cmd + alt + n)`, or without selection, aka Plain note (`Ctrl/Cmd + alt + p`)
- Track annotations on its own pane
- Check/Uncheck items as you complete them
- Generate a report in Markdown with a summary of the pending and completed items

# Feedback and feature requests

Feel free to open [issues](https://github.com/thamara/vscode-code-annotation/issues) and suggest [new features](https://github.com/thamara/vscode-code-annotation/projects/1) for the extension.


# Installing

You can install the latest version of the extension via the Visual Studio Marketplace [here](https://marketplace.visualstudio.com/items?itemName=tkcandrade.code-annotation).

## Using a VSIX file
Download the [VSIX file](https://github.com/thamara/vscode-code-annotation/blob/master/code-annotation-0.0.1.vsix) and follow the steps on your VSCode:

1. Go to the "Extensions" pane
2. Click on the ... on the top right of the "Extensions" pane
3. Select "Install from VSIX"
4. Select the VSIX file you downloaded and click install

# Development

- For the development you'll need to use VSCode
- Install Node/Npm
- After forking/cloning the repository, run:
```
npm install
npm run compile
```
- And to run/test the extension, go the the Run pane and hit the green button on `Run Extension`. This will open a new VSCode window with the extension enabled.

## Creating a VSIX file for instalation

- "Compile" the extension as usual
  - `npm install`
- Install vsce
  - `npm install -g vsce`
- Create the VSIX file
  - `vsce package`


------------

settings

ID	Description	Default
code-annotation.showFileName	Show file name under annotation	true
code-annotation.showTimeStampForNoteCreation	Show created at timestamp under annotation	false
code-annotation.showTimeStampForNoteResolution	Show resolved at timestamp under annotation	false
code-annotation.customTODO	An array of RegExps to use as TODO for note suggestions	
code-annotation.annotationBG.enableDecoration	Enable color for the background for the annotation on the source code	true
code-annotation.annotationBG.color.dark	Color for the background for the annotation on the source code in a Dark theme	#FFFFFF13
code-annotation.annotationBG.color.light	Color for the background for the annotation on the source code in a Light theme	#0000000C

commands

code-annotation.addNote	Add note	Ctrl+Alt+N
editor/context
code-annotation.addPlainNote	Add plain note	Ctrl+Alt+P
code-annotation.clearAllNotes	Clear all notes		
code-annotation.refreshEntry	Refresh		view/title
code-annotation.summary	Summary		view/title
code-annotation.removeNote	Remove note		commandPaletteview/item/context
code-annotation.checkNote	Check note		commandPaletteview/item/context
code-annotation.checkAllNotes	Check all notes		view/item/context
code-annotation.uncheckNote	Uncheck note		commandPaletteview/item/context
code-annotation.uncheckAllNotes	Uncheck all notes		view/item/context
code-annotation.removeAllNotes	Remove all notes		view/item/context
code-annotation.openNote	Open note		commandPaletteview/item/context
code-annotation.editNote	Edit note		commandPaletteview/item/context
code-annotation.copyNote	Copy note		commandPaletteview/item/context

view Containers
codeAnnotation	Code Annotation	activitybar

views

codeAnnotationView	Code Annotation	codeAnnotation

------

Troubleshouting

---
node_modules/@types/vscode/index.d.ts:16386:76 - error TS1005: ',' expected.

16386  export interface TestItemCollection extends Iterable<[id: string, testItem: TestItem]> {
                 
FIX

npm uninstall typescript
npm install typescript --save-dev

---
