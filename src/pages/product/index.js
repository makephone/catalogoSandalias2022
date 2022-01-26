import React,{Component} from "react";
import api from '../../services/api';
import './styles.css';
import{Link} from 'react-router-dom';
import  utils from '../../util/util'
import Imagem from '../../components/Imagem';

export default class Product extends Component{
    state={
        product:[],
       productInfo:{},
       cont:Number,item:null,qt:0,observacao:'',codCor:[],foto:'',loaded: false,
    }

 

    async componentDidMount(){
        const {id} =this.props.match.params;
        const response=await api.get(`/product/${id}`);
        this.setState({codCor:response.data.codicor});
        this.setState({foto:response.data.url}); 
        this.setState({product:response.data});
    }
    
    render(){
          let{product,item,qt,cont,codCor,foto}=this.state;
          let vr = localStorage.getItem('@hutweb/carrinho');

         if(vr==null){
            vr='{"docs": []}';
            localStorage.setItem('@hutweb/carrinho',vr);
         }
         vr = localStorage.getItem('@hutweb/carrinho');
         vr=JSON.parse(vr);
          vr=vr.docs;
          vr=Object.keys(vr).length;
          qt=vr;
        

  const showEvent = () =>{
    let{product,item,observacao,foto}=this.state;
  let productAr=true;
  let vr = localStorage.getItem('@hutweb/carrinho');
  vr=JSON.parse(vr);
  vr=vr.docs;
  vr.forEach(it => {
      if (it.item === item && it._id===product._id) {
        it.ped = 1;
        it.obs=observacao;
        this.setState({cont:it.ped});
        productAr = false;
        }
    });
  let qAt=Object.keys(vr).length;
   if(productAr){
      product.item=item;
      product.ped=1;
      product.key=qAt;
      product.obs=observacao;
      product.url=foto
      vr.push(product);
      this.setState({cont:1});
     }
     
   qAt=Object.keys(vr).length;
   this.setState({qt:qAt});     
   vr= JSON.stringify(vr);
   vr='{"docs":'+vr+'}';
   localStorage.setItem('@hutweb/carrinho',vr);    
   }

            const bt17= (cod,ft) =>{
            this.setState({item:cod});
             this.setState({foto:ft});
             this.setState({cont:Number});
            }  



           

                 

return(
        
        
        <div className="product-info">
          
        <div className="perfil">
        <Imagem source={foto}  titulo="dd" />
        <div className="logica">
          <div>
         
         {product.title===undefined||product.title===""? (<h1>carregando</h1>):(<p>Clique No Botão é Confirme a Cor</p>)}



        {
          codCor.map((product,index)=>(
            <button key={index} onClick={()=>bt17(product.cod,product.foto)}><div>{product.cod}</div></button >
          ))
        }

        

        
        </div>
        
        
         </div>
        </div>
        <div className="detalhe">
          
        {product.title===undefined||product.title===""? (<h1>aguarde</h1>):(<h1>{product.title}</h1>)}{item}{cont!==Number &&(<strong>{cont}</strong>)}
        {product.description===undefined||product.description==="" ? (<p>aguarde..</p>):(<p>{utils.formatCurrency(product.description)}</p>)}
       
        <div>
          <p>Descreva em baixo o seu pedido:</p>
        <input className="textInp"  placeholder='12 31/32, 20 33/34' onChange={(event, type) => { 
          
         
          const obs =String(event.target.value);
          this.setState({observacao:obs})
          
          }} disabled={item===null}></input>
        </div>
        <div className='afasta'>
        <button  onClick={showEvent}disabled={item===null}><i className='fa fa-shopping-bag fa-xs' aria-hidden='true'></i> Adicionar {qt}</button>
        

        
        
        
        
        
        </div>
               
       </div>
	   
 <Link to={`/carrinho`}><i className='fa fa-shopping-cart fa-3x fixed-top d-flex justify-content-end'></i></Link>

 
 
 <Link to={`/`}><i className='fa fa-home fa-3x fa-3x fixed-top d-flex justify-content-start'></i></Link>
        </div>
         );
    }
}