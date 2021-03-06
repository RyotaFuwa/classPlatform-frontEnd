import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Doc.css';
import {Delete, Update, View} from "../../icons";

import EditorJs from 'react-editor-js';
import Header from '@editorjs/header';
import Paragraph from '@editorjs/paragraph';
import {getCleanDoc, updateCleanDoc} from "../../firebase/firebase.firestore.classes";
import CodeSnippet from "../../js/editorjs/block-tools/code-snippet";
import {CleanDocViewer} from "../CleanDocViewer/CleanDocViewer";


// TODO:Editor-js Code tools and some details

const EDITOR_JS_TOOLS = {
  paragraph: {
   class: Paragraph,
   config: {
     inlineToolbar: true,
   }
  },
  header: {
    class: Header,
    config: {
      defaultLevel: 4,
      levels: [4, 5, 6],
    }
  },
  code: CodeSnippet,
}

/*
import Separator from "../Blob/Separator";
import {Blob, BlobEditBox} from "../Blob/Blob";
import {Code, Delete, Image, TextCard, TextHeader, Update, View, XSquare} from "../../icons";
import './Doc.css';

const nodeFetch = require('node-fetch');
const API_URL = 'http://localhost:3001/api'

const ControlPanel = props => (
  <div>
    <span className='create-header m-2'>
      <TextHeader onClick={() =>props.addBlob('header')} />
    </span>
    <span className='create-txt m-2'>
      <TextCard onClick={() => props.addBlob('txt')} />
    </span>
    <span className='create-code m-2'>
      <Code onClick={() => props.addBlob('code')} />
    </span>
    <span className='create-img m-2'>
      <Image onClick={() => props.addBlob('img')} disabled />
    </span>
    <span className='ml-5 m-2'>
      <View onClick={() => props.setMode()} />
    </span>
    <span className='m-2'>
      <Update  onClick={() => props.onUpdate()}/>
    </span>
    <span className='m-2'>
      <Delete onClick={() => props.onDelete()} disabled />
    </span>
    </div>
)

class Doc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focusIdx: null,
      mode: 0,
    };
  }

  async componentDidMount() {
    if(!this.props.doc) {
      this.setState()
    }
  }

  deleteAt(idx) {
    this.setState(state => {
      state.blobs.splice(idx, 1);
      return {blobs: [...state.blobs]}
    })
  }

  update() {
    nodeFetch(`${API_URL}/classes/${this.props.classTitle}/${this.props.doc._id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({doc: {blobs: this.state.blobs}})
    })
      .then(res => console.log('updated'))
      .catch(rej => console.log('failed'))
  }

  move(to) {
    let isReady = this.state.focusIdx !== null && this.state.focusIdx >= 0 && this.state.focusIdx < this.state.blobs.length
    let noChange = this.state.focusIdx === to || this.state.focusIdx + 1 === to;
    if(isReady && !noChange) {
      this.setState(state => {
        let [e] = state.blobs.splice(this.state.focusIdx, 1);
        if(this.state.focusIdx < to)
          to -= 1;
        state.blobs.splice(to, 0, e);
        return {blobs: [...state.blobs], focusIdx: null}
      })
    }
  }

  addBlob(type) {
    switch(type) {
      case 'header':
        this.setState(state => ({blobs: [...state.blobs, {mode: 0, type: 'header', size: 'lg', header: ''}]}))
        break;
      case 'txt':
        this.setState(state => ({blobs: [...state.blobs, {mode:0, type: 'txt', txt: ''}]}))
        break;
      case 'code':
        this.setState(state => ({blobs: [...state.blobs, {mode:0, type: 'code',  language: '', code: ''}]}))
        break;
      case 'img':
        this.setState(state => ({blobs: [...state.blobs, {mode:0, type: 'img', imgUrl: ''}]}))
        break;
      default:
        break;
    }
  }

  changeBlob(idx, blob) {
    this.setState(state => {
      state.blobs[idx] = blob;
      return {blobs: [...state.blobs]};
    })
  }

  renderBlobs() {
    let blobs = [];
    switch(this.state.mode) {
      case 0:
        blobs = this.state.blobs.map((each, idx) => <Blob key={`${each.title}_${idx}`} blob={{...each, mode: 0}} />);
        break;
      case 1:
        blobs.push(<Separator key={0} onDrop={() => this.move(0)}/>);
        for(let i = 0; i < this.state.blobs.length; i++) {
          let blob = this.state.blobs[i];
          blobs.push(
            <BlobEditBox key={`${blob.title}_${i}`}
                         blob={blob}
                         onDragStart={() => this.setState({focusIdx: i})}
                         onDelete={() => this.deleteAt(i)}
                         onChange={blob => this.changeBlob(i, blob)}>
              <Blob blob={blob} onChange={blob => this.changeBlob(i, blob)} />
            </BlobEditBox>
          )
          blobs.push(<Separator key={i + 1} onDrop={() => this.move(i + 1)}/>);
        }
        break;
      default:
        break;
    }
    return blobs;
  }

  render() {
    let admin = this.props.currentUser && this.props.currentUser.admin;
    return (
      <div className='doc'>
        <div className='class-title' style={this.props.theme}>
          {this.props.doc.title}

        </div>
        <div className='page-blobs'>
          {this.renderBlobs()}
        </div>
        {admin && (
          <ControlPanel addBlob={type => this.addBlob(type)}
                        onUpdate={() => this.update()}
                        onDelete={() => this.load()}
                        setMode={() => this.setState({mode: this.state.mode === 0 ? 1 : 0})} />
        )
        }
      </div>
    )
  }
}
*/


class Doc extends Component {
  constructor(props) {
    super(props);

    const admin = this.props.currentUser && this.props.currentUser.admin;
    this.state = {
      cleanDoc: {},
      mode: admin ? 1 : 0,
    }
    this.editor = null;
  }

  componentDidMount() {
    if(this.props.doc) {
      const {cleanDocId} = this.props.doc;
      if (cleanDocId) {
        getCleanDoc(cleanDocId)
          .then(snapShot => {
            this.setState({cleanDoc: snapShot.data()})
          })
          .catch(err => console.log(err))
      }
    }
  }

  async updateCleanDoc() {
    const {cleanDocId} = this.props.doc;
    if(this.editor && cleanDocId) {
      this.editor.save()
        .then(data => {
          updateCleanDoc(cleanDocId, data);
          this.setState({cleanDoc: data})
        })
        .catch(err => {
          console.log(err);
        })
    }
  }

  async viewCleanDoc() {
    if(this.state.mode === 0) {
      this.setState({mode: 1});
    }
    else {
      const {cleanDocId} = this.props.doc;
      if (this.editor && cleanDocId) {
        await this.editor.isReady;
        this.editor.save()
          .then(cleanData => {
            this.setState({cleanDoc: cleanData, mode: 0});
          })
          .catch(err => console.log(err));
      }
    }
  }

  render() {
    if(!this.props.doc) {
      return <div className='doc'>Document Not Found.</div>
    }
    const admin = this.props.currentUser && this.props.currentUser.admin;
    return (
      <div className='doc'>
        <div className='title' style={this.props.theme}>
          {this.props.doc.name}
          <span className='m-2' />
          {admin &&
            <span className='h4'>
              <View
                pushed={this.state.mode === 0}
                onClick={() => this.viewCleanDoc()}
              />
              <Update onClick={() => this.updateCleanDoc()} />
              <Delete />
            </span>
          }
        </div>
        <div className='content'>
          {
            this.state.mode === 0 &&
            <CleanDocViewer data={this.state.cleanDoc} />
          }

          {/*if this.stte.mode !== 0 then it disappears, but don't want it to be rendered so display style used here*/}
          <div id='holder' style={{display: this.state.mode === 0 ? 'none' : null}} />
          <EditorJs
            holder='holder'
            enableReInitialize={true}
            instanceRef={instance => this.editor = instance}
            data={this.state.cleanDoc}
            tools={EDITOR_JS_TOOLS}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
})

export default connect(mapStateToProps)(Doc);