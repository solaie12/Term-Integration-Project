import React, { Component } from "react";
import axios from "axios";
import { dev, prod } from './APIEndpoints';
import CircularProgress from "@mui/material/CircularProgress";

class UploadFile extends Component {
  state = {
    // Initially, no file is selected
    selectedFile: null,
    uploadingFile: false,
    uploadDone: false,
  };

  // On file select (from the pop up)
  onFileChange = (event) => {
    // Update the state
    this.setState({ selectedFile: event.target.files[0] });
  };

  // On file upload (click the upload button)
  onFileUpload = () => {
   
    this.setState({
      uploadingFile : true
    })
   
    const formData = new FormData();

    
    formData.append(
      "file_uploaded",
      this.state.selectedFile,
      this.state.selectedFile.name
    );

  
    console.log(this.state.selectedFile);

    


  let uploadURL = '';
  if (process.env.NODE_ENV === 'development') {
    uploadURL = `${dev.baseURL}${dev.upload}`;
  } else if (process.env.NODE_ENV === 'production') {
    uploadURL = `${prod.baseURL}${prod.upload}`;
  }
    axios
      .post(uploadURL, formData)
      .then((response) => {
    
        console.log(response.data);
      });

      this.setState({
        uploadingFile : false
      })
      this.setState({
        uploadDone: true
      })
  };
  

 
  fileData = () => {
 
    const {uploadingFile} =  this.state
    const  {uploadDone} = this.state

    if (this.state.selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>

          <p>File Name: {this.state.selectedFile.name}</p>

          <p>File Type: {this.state.selectedFile.type}</p>

          <p>
            Last Modified:{" "}
            {this.state.selectedFile.lastModifiedDate.toDateString()}
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          {uploadingFile &&
               <CircularProgress />
          }
          
          {uploadDone &&
                <h4> File Uploaded!! </h4>
          }
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };

  render() {
    return (
      <div  style={{ marginTop: "30px", marginLeft: "200px"}}>
        <h1>Upload data</h1>

        <div>
          <input type="file" onChange={this.onFileChange} />
          <button onClick={this.onFileUpload}>Upload!</button>
        </div>
        {this.fileData()}
      </div>
    );
  }
}

export default UploadFile;
