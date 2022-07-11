import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './styles.css';

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16,
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};

const text = {
  margin: 0
}


function Previews(props) {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (props.onSend === true) {
      setFiles([])
    }
  }, [props.onSend])

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })));

    props.onFileUploaded(acceptedFiles)
  }, [props])

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop
  });


  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          alt="Preview"
        />
      </div>
    </div>
  ));

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <section className="containerDropzone">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} accept="image/*" name="dropzone" />
        <p style={text}>Drag 'n' drop one or more images here, or click to select images to upload</p>
      </div>
      <aside style={thumbsContainer}>
        {thumbs}
      </aside>
    </section>
  );
}

<Previews />

export default Previews;