const generateId = (id, len) => {
    const idLen = len.toString().length;
    const idStr = id.toString().padStart(idLen, '0');
    return idStr;
}

/**
 * 
 * @param {[HTMLImageElement[], string[], {}]} param0 
 * @returns {Promise<Blob>}
 */
export const zip = async ([output, input, param], onEachFileCallback = (item,progress)=>{}) => {
    const sources = [];
    const zip = new JSZip();
    for(let i = 0; i < output.length; i++) {
        const id = generateId(i, output.length);
        const image = output[i].src;
        sources.push({id, src: input[i]});
        await new Promise((resolve, reject) => {
            JSZipUtils.getBinaryContent(image, (err, data) => {
                if(err) reject(err);
                zip.file(`images/${id}.png`, data, {binary: true});
                resolve();
            });
        });
    }
    zip.file("sources.txt", sources.map(({id, src}) => `${id}\t${src}`).join('\n'));
    const base64 = await zip.generateAsync({ type: "base64" }, (metadata) => {
        onEachFileCallback(metadata, metadata.percent);
    });
    return "data:application/zip;base64," + base64;
}
