//import react
import React from 'react';

//import components
import { FileUploader } from 'react-drag-drop-files';

//import icon & image
import { AiOutlineCloudUpload } from 'react-icons/ai';

//import style
import style from './FileUpload.module.css';

function FileUpload({
        children , name , file , setValue,
        width , height
    }){

    return (
        <div>
            <div className={style['upload-label']}>{children}</div>
            <FileUploader 
                id={name}
                name={name}
                multiple={false}
                fileOrFiles={null}
                types={['PDF']}
                maxSize={32}
                children={
                    <UploadBox 
                        file={file}
                        width={width}
                        height={height}
                    />
                }
                handleChange={(file) => {
                    setValue(name , file);
                }}
            />
        </div>
    );
}

function UploadBox({ file , width , height}){
    let label = "Click to upload or drag and drop PDF (max, 32MB)" ;
    if(file) label = file.name;

    return (
        <>
            <div className={style["upload-content"]} style={{width , height}}>
                <AiOutlineCloudUpload size={'35px'} color="#232360" />
                <div>{label}</div>          
            </div>
        </>
    );
}

export default FileUpload;
