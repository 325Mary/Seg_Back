// helpers/returnPath.js
const returnPath = (filePath) => {
    if (!filePath) return null;
    
    let file_split = filePath.split("/");
    let final_path = file_split[1] + "/" + file_split[2];
    
    return final_path;
}

module.exports = returnPath;