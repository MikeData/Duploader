import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const IPFS = require('ipfs-http-client');
const ipfs = IPFS.create('https://ipfs.infura.io:5001');

//IPFS({ host: 'ipfs.infura.io', port: 5001, apiPath: '/api/v0', protocol: 'https' });

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      newtwork: 'https://ipfs.infura.io/ipfs/',
      image_buffer: null,
      image_hash: null,
      image_size: null,
      meta_hash: null,
      meta_buffer: null,
      meta_size: null,
      name: null,
      description: null,
      metadata_hash: null
      
    };
  }
  setName = (event) => {
    event.preventDefault()
    this.setState({ name: event.target.value })
  }
  setDescription = (event) => {
    event.preventDefault()
    this.setState({ description : event.target.value })
  }
  submitMetadata = async (event) => {
    event.preventDefault();
    const name = this.state.name
    const description = this.state.description
    const image_uri = this.state.newtwork + this.state.image_hash
    const meta_uri = this.state.newtwork + this.state.meta_hash
      
    const metadata = {
      "name": name,
      "description": description, 
      "image": image_uri,
      "meta": meta_uri
    }

    console.info(metadata)
    
    let result = await ipfs.add(metadata)
    this.setState({ metadata_hash: result.path}) 
    
    console.log('tokenURI', this.state.metadata_hash)
 
  }
  captureImage = (event) => {
    event.preventDefault()
    
    // Capture file...
    console.log('file captured...')
    console.log(event.target.files)
    const file = event.target.files[0]
    
    // Process file for IPFS...
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () =>{
      this.setState({ image_buffer: Buffer(reader.result)})
      console.log('buffer', this.state.image_buffer)
    }

  }
  captureMeta = (event) => {
    event.preventDefault()
    
    // Capture file...
    console.log('file captured...')
    console.log(event.target.files)
    const file = event.target.files[0]
    
    // Process file for IPFS...
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () =>{
      this.setState({ meta_buffer: Buffer(reader.result)})
      console.log('buffer', this.state.meta_buffer)
    }

  }
  submitFile = async (event) => {
    event.preventDefault();

    // Submit file to IPFS...
    console.log('submitting file...')
    let img_bf = this.state.image_buffer
    let meta_bf = this.state.image_buffer
    let image = await ipfs.add(img_bf)
    let meta = await ipfs.add(meta_bf)
    this.setState({ 
      image_hash: image.path, 
      image_size: image.size,
      meta_hash: meta.path, 
      meta_size: meta.size
    }) 
  }

  render() {
    return (
      <div>
        <section>
          <nav className="navbar navbar-dark bg-dark flex-md-nowrap p-0 shadow">
            <h1>DeFile</h1>
          </nav>
        </section>
        <section>
          <table>
            <tbody>
            
              <tr>
                <th width="30%">
                <div className="container-fluid">
                <div className="content" >
                <p>&nbsp;</p>   
                <h2>UPLOAD</h2>
                  <form onSubmit={this.submitFile}>
                    <ul>
                      <li>Image</li>
                          <input type='file' onChange={this.captureImage} />
                        <p>&nbsp;</p>
                      <li>Meta</li>
                          <input type='file' onChange={this.captureMeta}/>
                        <p>&nbsp;</p>
                          <input type='submit' /> 
                    </ul>
                  </form>
                  <p>&nbsp;</p> 
                  
                </div>
              </div>
              </th>
              <th width="30%">
                <div className="container-fluid">
                  <div className="content" >                  
                    <h2>SETUP</h2>
                    <form onSubmit={this.submitMetadata}>
                      <ul>
                        <li>Enter a name</li>
                            <input type='text' onChange={this.setName} />
                          <p>&nbsp;</p>
                        <li>Enter description</li>
                            <input type='text' onChange={this.setDescription} />
                          <p>&nbsp;</p>
                            <input type='submit' /> 
                      </ul>
                    </form>
                  </div>
                </div>
              </th>
              <th width="30%">
                <div className="container-fluid">
                  <div className="content" >
                    
                    <h2>Metadata</h2>
                      <p>name: {this.state.name}</p>
                      <p>description: {this.state.description}</p>
                      <p>imageURI: {this.state.image_uri}</p>
                      <p>metaURI: {this.state.meta_uri}</p>

                    </div>
                  </div>
                </th>
              </tr>
            </tbody>  
          </table>
          
        </section>
        <p>&nbsp;</p>
          <p>&nbsp;</p>
          <p>&nbsp;</p>
          <p>&nbsp;</p>
        <section>
          <footer>
            <h2>File Pointers</h2>
            <p>{'Image '} 
              <a href='https://gatemway.ipfs.infura.io:5001/'
                target='_blank' 
                rel='noopener noreferrer'>
                  https://ipfs.infura.io:5001/{ this.state.image_hash }
              </a>
            </p>
            <p>{'Meta '}
              <a href='https://gatemway.ipfs.infura.io:5001/'
                target='_blank' 
                rel='noopener noreferrer'>
                  https://ipfs.infura.io:5001/{ this.state.meta_hash }
              </a>
            </p>
            <p>{'Metadata '} 
              <a href='https://gatemway.ipfs.infura.io:5001/'
                target='_blank' 
                rel='noopener noreferrer'>
                  https://ipfs.infura.io:5001/{ this.state.metadata_hash }
              </a>
            </p>           
          </footer>
        </section>
        
      </div>
    );
  }
}

export default App;
