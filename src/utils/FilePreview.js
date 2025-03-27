import React from 'react';
import PdfIcon from 'src/assets/images/Icon_pdf_file.png';

class FilePreview extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            file: this.props.file,
            viewImage: this.props.viewImage || false,
        }
    }

    static getDerivedStateFromProps(props, state) {
        let update = {};
    
        if (props.file !== state.file) {
            update.file = props.file;
        }
        if ('viewImage' in props && props.viewImage !== state.viewImage) {
            update.viewImage = props.viewImage;
        }
        return update;
    }

    getImageSrc = (item) => {
        return URL.createObjectURL(item);
    }

    handleClick = (file) => {
        if(this.state.viewImage){
            window.open(file, '_blank').focus();
        }
    }

    render(){
        let file = this.state.file;
        let type = '';
        if(typeof file == "object"){
            type = file.type;
            file = this.getImageSrc(file);
        }else{
            type = file.split('.').pop();
        }

        return (
            <div>
                {
                    (type == "application/pdf" || type == "pdf") ?
                    <img
                        src={PdfIcon}
                        loading="lazy"
                        style={{cursor: "pointer" }}
                        onClick={() => this.handleClick(file)}
                    />
                    :
                    <img
                        src={file}
                        loading="lazy"
                        style={{ cursor: "pointer" }}
                        onClick={() => this.handleClick(file)}
                    />
                }
            </div>
        )
    }
}

export default FilePreview;