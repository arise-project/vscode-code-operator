# Code Operator

**Revolutionizing Collaborative Coding with Seamless Annotation Sharing**

Code Operator is not just an enhancement; it's a transformation of the original 'Code Annotation' Visual Studio Code extension by Thamara Andrade. With Code Operator, collaborative coding reaches new heights. Now, you can effortlessly create, share, and manage annotations directly within your source code, promoting efficient team communication and task management.

## Enhanced Annotation Sharing

Code Operator takes teamwork to the level where members share ideas ower code lines. It allowing team members to share code annotations seamlessly. Annotations are saved directly in your team's Git repository, organized neatly by each team member's name. Experience a streamlined workflow with individual trees in a view, making it easy to understand who annotated what and when.

## Key Features

- **Effortless Annotation Creation:** Select a portion of code, right-click, and add a note effortlessly. Or use convenient keyboard shortcuts:
  - **New Note from Selection:** `Ctrl/Cmd + alt + n`
  - **Plain Note (Without Selection):** `Ctrl/Cmd + alt + p`

- **Intuitive Tracking:** Keep track of annotations in dedicated panes. Check and uncheck items, providing clear visibility into your progress.

- **Annotation Storage in Git:** Annotations are saved as JSON files within your team's Git repository, each annotation file organized under the annotator's name. This structured approach ensures easy access and management.

## How Code Operator Enhances Collaboration

Code Operator transforms your collaborative coding experience:

- **Efficient Team Communication:** Share annotations effortlessly, fostering effective communication among team members.

- **Clear Accountability:** Easily track annotations, promoting accountability for tasks. Individual trees per team member provide a clear overview of contributions.

- **Simplified Management:** Annotations are neatly organized within the team's Git repository, eliminating confusion and ensuring easy access.

## Get Involved

We acknowledge and respect the original author's vision. Operating under the GPL license, Code Operator values the simplicity of its predecessor while introducing powerful features. Your feedback, feature requests, or issues are essential. Please share them on our [GitHub repository](https://github.com/arise-project/vscode-code-operator), as we're committed to making Code Operator the ultimate tool for collaborative coding.

Code Operator, an enhanced version of the original 'Code Annotation' Visual Studio Code extension by Thamara Andrade, revolutionizes your collaborative coding experience. With Code Operator, you can create, share, and manage annotations directly within your source code. Respectful of the original author's vision and licensed under GPL, this extension brings powerful new features while retaining the simplicity of its predecessor.

## Settings

ID	Description	Default
code-operator.showFileName	Show file name under annotation	true
code-operator.showTimeStampForNoteCreation	Show created at timestamp under annotation	false
code-operator.showTimeStampForNoteResolution	Show resolved at timestamp under annotation	false
code-operator.customTODO	An array of RegExps to use as TODO for note suggestions	
code-operator.annotationBG.enableDecoration	Enable color for the background for the annotation on the source code	true
code-operator.annotationBG.color.dark	Color for the background for the annotation on the source code in a Dark theme	#FFFFFF13
code-operator.annotationBG.color.light	Color for the background for the annotation on the source code in a Light theme	#0000000C

## Commands

code-operator.addNote	Add note	Ctrl+Alt+N
editor/context
code-operator.addPlainNote	Add plain note	Ctrl+Alt+P
code-operator.clearAllNotes	Clear all notes		
code-operator.refreshEntry	Refresh		view/title
code-operator.summary	Summary		view/title
code-operator.removeNote	Remove note		commandPaletteview/item/context
code-operator.checkNote	Check note		commandPaletteview/item/context
code-operator.checkAllNotes	Check all notes		view/item/context
code-operator.uncheckNote	Uncheck note		commandPaletteview/item/context
code-operator.uncheckAllNotes	Uncheck all notes		view/item/context
code-operator.removeAllNotes	Remove all notes		view/item/context
code-operator.openNote	Open note		commandPaletteview/item/context
code-operator.editNote	Edit note		commandPaletteview/item/context
code-operator.copyNote	Copy note		commandPaletteview/item/context

## View Containers

codeAnnotation	Code Annotation	activitybar

## Views

codeAnnotationView	Code Annotation	codeAnnotation

## Troubleshouting

node_modules/@types/vscode/index.d.ts:16386:76 - error TS1005: ',' expected.
16386  export interface TestItemCollection extends Iterable<[id: string, testItem: TestItem]> {
FIX
npm uninstall typescript
npm install typescript --save-dev
