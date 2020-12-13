// Ordinarily, you'd generate this data from markdown files in your
// repo, or fetch them from a database of some kind. But in order to
// avoid unnecessary dependencies in the starter template, and in the
// service of obviousness, we're just going to leave it here.

// This file is called `_posts.js` rather than `posts.js`, because
// we don't want to create an `/blog/posts` route — the leading
// underscore tells Sapper not to do that.
import path from 'path';
import frontMatter from 'front-matter';
import utils from '../../helper/utils';
const route = './src/routes/blog';
const fileExtension = '.md'
const fileName = ''; 

/* NOTE  
* Transforms every matching entry in the directory into an pathInfoObject
*
* Iterates a directory 
* Checks if the entry is an directory 
* Iterates the sub directory and returns the valid files
* Transform entries int pathInfoObject
*
*/
let pathInfoObjs =
    utils.readFilesFromDirectory(route)
    .map((entry) => {
        let filePath = path.resolve(route, entry);
        // *only directory paths are allowed in the array 
        if (utils.isDirectory(filePath) == false) return false
        let validFiles = [];
        /* NOTE
        * Only md or svx files are allowed in the directory 
        * Only one markdown file is should be returned
        * */
        validFiles = utils.readFilesFromDirectory(filePath, (dirFiles)=> {
            return dirFiles.filter(file => {
                // if (file.endsWith('index.svx') || file.endsWith('index.md'))
                // console.log(file.endsWith(`${fileName}${fileExtension}`));
                if (file.endsWith(`${fileName}${fileExtension}`))
                    return file;
            });
        });
        // console.log(validFiles);
        if (validFiles.length == 0) return false
        return {
            path: filePath,
            folder: entry,
            fileNames: validFiles
        }
    }).filter(p => p != false);
    
/* NOTE  
* Generate posts from pathInfoObjects 
*
* Builds the path to the post file
* Reads the post file and create valid string format
* Generate the post
*/
let posts = pathInfoObjs.map(pathInfo => {
    let readingTime = 0;
    let contentFrontMatter;
    let fileInfoContent, FileInfoIndex = null;
    let matchContentFile = pathInfo.fileNames.filter(f=> f === 'content.md')
    if (matchContentFile.length === 1) {
        let fileName = matchContentFile[0];
        let filePath = path.resolve(pathInfo.path, fileName);
        let fileContent = utils.readFileContent(filePath, {encoding:'utf8'})
        //NOTE prepare content to get the reading time ...
        fileContent = utils.removeLineBreaks(fileContent);
        fileContent = utils.removeHTML(fileContent);
        fileContent = utils.removeSpecialChars(fileContent);
        readingTime = utils.calcReadingTime(fileContent);
        //NOTE for creation date and mod date...
        fileInfoContent = utils.getFileInfo(filePath);
        // console.log(fileContent);
    }
    let matchIndexFile = pathInfo.fileNames.filter(f=> f === 'index.md')
    if (matchIndexFile.length === 1) {
        let fileName = matchIndexFile[0];
        let filePath = path.resolve(pathInfo.path, fileName);
        let fileContent = utils.readFileContent(filePath, {encoding:'utf8'})
        //NOTE no content file was found... 
        if (matchContentFile.length === 0) {
            fileContent = utils.removeHTML(fileContent);
            fileContent = utils.removeSpecialChars(fileContent);
            fileContent = utils.removeLineBreaks(fileContent);
            readingTime = utils.calcReadingTime(fileContent);
        }
        // console.log(fileContent);
        contentFrontMatter = frontMatter(fileContent);
        FileInfoIndex = utils.getFileInfo(filePath);
        // const renderer = new marked.Renderer();
    }
    return {
        ...contentFrontMatter.attributes,
        slug: pathInfo.folder,
        creationDate: FileInfoIndex.cdate,
        creationTime: FileInfoIndex.ctime,
        modificationDate: (fileInfoContent == null) ? FileInfoIndex.mdate : fileInfoContent.mdate,
        modificationTime: (fileInfoContent == null) ? FileInfoIndex.mtime : fileInfoContent.mtime,
        readingTime: readingTime,
        // html: (marked(postFrontMatter.body, { renderer })),
    }
});

posts.sort(utils.sortAgainstDate);
export default posts;
