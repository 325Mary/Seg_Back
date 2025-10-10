returnPath = (path) => {
    let file_path = path;
    // WIN
    // let file_split = file_path.split("\\")
    // let final_path = file_split[1] + "/" + file_split[2];

    // Linux
    let file_split = file_path.split("/")
    let final_path = file_split[1] + "/" + file_split[2];


    return final_path;
}

module.exports = returnPath