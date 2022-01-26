import React,{Component} from "react";
import './styles.css';
import{Link} from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import api from '../../services/api';
import axios from "axios";


export default class Product extends Component{
state={
product:[],
productInfo:{},
page:1,item:null,qt:0,show:false,codCliente:'',
}



shouldComponentUpdate(nes,pr){
if(this.state.qt !==nes.qt){
return true;
}
return false;
}

render(){

  const handleShow= () =>{
    this.setState({show:true});
   }   


   const handleClose= () =>{
    this.setState({show:false});
   } 


   const handleFinalizar=async () =>{
    const {codCliente}=this.state; 
    const response= await api.get(`/verificar/${codCliente}`);
       if(response.data===null){
         return
       }else{
         

         let vr1 = localStorage.getItem('@hutweb/carrinho');
         vr1=JSON.parse(vr1);
         vr1=vr1.docs;
          

         const pedido={
           cliente:response.data.nome,
           telefone:response.data.tel,
           codigo:response.data.codigo,
           pedido:vr1,
         }
          
         await axios.post(
          "https://catalogo-fab01-default-rtdb.firebaseio.com/pedidos.json",
          pedido
        );


       const  vr='{"docs": []}';
       localStorage.setItem('@hutweb/carrinho',vr); 
       this.setState({show:false,Product:[],productInfo:{},qt:0});
        
         
       }

  

   } 


   let{show}=this.state;

let vr = localStorage.getItem('@hutweb/carrinho');
const canc=2;
if(vr==null){
vr='{"docs": []}';
localStorage.setItem('@hutweb/carrinho',vr);
}
vr = localStorage.getItem('@hutweb/carrinho');
vr=JSON.parse(vr);
vr=vr.docs;


const btG= (u,f) =>{
let vr1 = localStorage.getItem('@hutweb/carrinho');
vr1=JSON.parse(vr1);
vr1=vr1.docs;
switch (f){
    case 0:
        let count=vr1[u].ped;
        vr1[u].ped=count+1;
        break;
    case 1:    
    let count1=vr1[u].ped;
    if(count1>1){
    vr1[u].ped=count1-1;
    }
    break;

    case 2:
    vr1.splice(u,1);
    break
    default:
}
let cache1= JSON.stringify(vr1);
cache1='{"docs":'+cache1+'}';
localStorage.setItem('@hutweb/carrinho',cache1);
this.setState( state => ({qt:state.qt+1}))
}  
return(
<section className="feed">
<div className="container">

  {Object.keys(vr).length===0 &&(<div className='vazio'></div>)}  
  
  {Object.keys(vr).length!==0 &&(<div>Listagem do carrinho de pedido</div>)} 


 


{
vr.map((product,index)=>(
<article className="post" key={index}>
<figure className="post__img">
<img src={product.url} alt={product.key}></img>
<div>
<p>{product.title}  {product.item}</p>
<p> R$ {product.description}</p>
<p>{product.obs}</p>
</div>
</figure>
<nav className="post__buttons">
<div className="post__buttons__container">
<p> {product.ped}</p> 
<button onClick={()=>btG(index,canc)} className="post__button"><i className='fa fa-trash fa-3x'></i></button> 
</div>    
</nav>
 </article>
))}
  



{Object.keys(vr).length!==0 &&(<Button variant="primary" onClick={handleShow}>Fazer Pedido</Button>)}  




      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Finalizar Pedido</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          <h1>DIGITE SEU CÓDIGO DE CLIENTE :</h1>
          

          <input type="text"  placeholder='0123456' onChange={(event, type) => { 
          
          
          const value =String(event.target.value);
          this.setState({codCliente:value})

          
          }} ></input>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleFinalizar}>
            Enviar
          </Button>
        </Modal.Footer>
      </Modal>
























<Link to={`/`}><i className='fa fa-home fa-3x fa-3x fixed-top d-flex justify-content-start'></i></Link>
</div>
</section>
);
}
}