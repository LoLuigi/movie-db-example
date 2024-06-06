import 'bootstrap/dist/css/bootstrap.min.css';  
import {Modal, Button} from 'react-bootstrap';
import { useState } from 'react';

import './styles.css'
import Picture from '../Picture';

const Popup = (props) =>{
    const [show, setShow] = useState(false);  
  
    const modalClose = () => setShow(false);  
    const modalShow = () => setShow(true);  
    return (  
      <div className="closed">  
         <Button variant="success" onClick={modalShow}>  
            <Picture src={props.content}/>
        </Button>  
    <Modal show={show} onHide={modalClose}>  
    <Modal.Header closeButton>  
      {/* <Modal.Title>Title for Modal</Modal.Title>   */}
    </Modal.Header>  
    
    <Modal.Body>  
    <div class="column2">
    <Picture className="big" src={props.content}/>
    </div>  
    </Modal.Body>  
    
    <Modal.Footer>  
      <Button variant="secondary" onClick={modalClose}>Close Picture</Button>  
    </Modal.Footer>  
  </Modal>  
      </div>  
    );    
}  
export default Popup;  