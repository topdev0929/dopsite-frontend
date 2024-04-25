import React, { Component } from 'react'
import SignaturePad from 'react-signature-canvas'
import { Button } from 'antd'

class Signature extends Component {
  // state = {trimmedDataURL: null}
  sigPad = {}
  clear = () => {
    this.sigPad.clear()
  }
  trim = () => {
    // this.setState({trimmedDataURL: this.sigPad.getTrimmedCanvas()
    //   .toDataURL('image/png')})
    this.props.signature(this.sigPad.getTrimmedCanvas().toDataURL('image/png'))
  }
  render () {
    // let {trimmedDataURL} = this.state
    return <div>
      <div
        style={{ width: '300px', height: '120px', margin: '0 auto', border: '1px solid #ccc' }}
      >
        <SignaturePad
          canvasProps={{ width: '300px', height: '120px'  }}
              ref={(ref) => { this.sigPad = ref }} />
      </div>
      <div style={{ textAlign: 'center', marginTop: 20 }}>
        <Button onClick={this.clear} style={{ marginRight: 20 }}>
          Clear
        </Button>
        <Button type='primary' onClick={this.trim}>
          Signature
        </Button>
      </div>
      {/* {trimmedDataURL
        ? <img
          // className={styles.sigImage}
          src={trimmedDataURL} />
        : null} */}
    </div>
  }
}

export default Signature

