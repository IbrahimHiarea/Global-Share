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
        width , height , label , types , row ,
        required
    }){

    return (
        <div>
            {children && <div className={style['upload-label']}>{children}</div>}
            <FileUploader 
                id={name}
                name={name}
                multiple={false}
                fileOrFiles={null}
                types={types}
                maxSize={32}
                children={
                    <UploadBox 
                        file={file}
                        width={width}
                        height={height}
                        label={label}
                        row={row}
                    />
                }
                handleChange={(file) => {
                    setValue(name , file);
                }}
                required={required}
            />
        </div>
    );
}

function UploadBox({ file , width , height , label , row}){
    let newLabel = "Click to upload or drag and drop PDF (max, 32MB)" ;
    if(label) newLabel = label;
    if(file) newLabel = file.name;

    return (
        <>
            <div className={style["upload-content"]} style={{width , height , flexDirection: row ? "row" : 'column' , justifyContent: row ? 'flex-start' : 'center'}}>
                <AiOutlineCloudUpload size={'25px'} color="#232360"  opacity={.9}/>
                <div>{newLabel}</div>          
            </div>
        </>
    );
}

export default FileUpload;
