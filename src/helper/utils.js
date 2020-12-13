
const utils = {
    isDirectory: (fullPath) =>{
        var stats = require('fs').lstatSync(fullPath)
        return stats.isDirectory()
    },
    getFileInfo: (fullPath) =>{
        try {
            // console.log(fullPath)
            var stats = require('fs').lstatSync(fullPath)
            return {
                cdate:stats.birthtime.toDateString(),
                ctime: stats.birthtime.toTimeString(),
                mdate: stats.mtime.toDateString(),
                mtime: stats.mtime.toTimeString(),
            }
        } catch (e) { return false }
    },
    readFilesFromDirectory: (path, callback = null) =>{
        var dirFiles = require('fs').readdirSync(path)
        if (typeof(callback) != 'undefined' && callback != null) 
            dirFiles = callback(dirFiles)
        return dirFiles;
    },
    calcReadingTime: (text) =>{
        let wordsPerMinute = 300;
        let wordsInText = text.split(/\s/g).length;
        let readingTime = Math.ceil( wordsInText / wordsPerMinute );
        return readingTime;
    },
    readFileContent: (filePath, args)=>{
        return require('fs').readFileSync(filePath, args);
    },
    removeHTML: (text) =>{
        return text.replace(RegExp(/<.*?>/gmi), '');
    },
    removeLineBreaks: (text) =>{
        text = text.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '')
        return text.replace(RegExp(/\r\n/g), '');
    },
    removeSpecialChars: (text) =>{
        return  text.replace(RegExp(/[^.!$\w\s]/gi), '')
    },
    getIPAdresse: () =>{
        const ifaces = require('os').networkInterfaces();
        let ip;

        Object.keys(ifaces).forEach(dev => {
            ifaces[dev].filter(details => {
                if (details.family === 'IPv4' && details.internal === false) {
                    ip = details.address;
                }
            });
        });
        return ip
    },
    sortAgainstDate(current, next) {
        return new Date(current.creationDate).getTime() - new Date(next.creationDate).getTime();
    },
    getTags(posts) {
        let tagList = [];
        for (const post of posts) {
            tagList.push(...post.tags)
        }
        var distTags =  tagList.filter((e, i, o) => o.indexOf(e) === i);
        return distTags;
    },
    filterPostsByTag(posts, event) {
       let filteredPosts = posts.map((e,i,o)=> {
            let tags = e.tags;
            let valid = tags.filter(tag => tag === event)
            if(valid.length === 1) {
                // console.log(e);
                return e
            }
            else
                return false
        }).filter(p => p != false);
        // console.log(filteredPosts);
        return filteredPosts;
    }
 }
 export default utils;