export function verticalModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
}
/** 
getComponent(){
    let component;
    switch (this.state.currentComponent){
        case 'compA' :
            component = <CompA/>;
            break;
        case 'compB' :
            component = <CompB/>;
            break;
        case 'compC' :
            component = <CompC/>;
            break;
        case 'compD' :
            component = <CompD/>;
            break;
    }
    return component;
}

render(){
    return(
        <div>
            {this.getComponent()}
        </div>
    );
}

**/