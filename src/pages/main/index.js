import React ,{Component} from 'react'; //impoct padrao do react
import api from '../../services/api'; //importamos a api com axioss
import './styles.css';  //importamos o css
import Products from '../../components/ListProducts/Products';   //importamos o componete Product
import{Link} from 'react-router-dom';
import { connect } from 'react-redux';  //importamos o connect
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav,Navbar,Form,NavDropdown,FormControl} from 'react-bootstrap';
import img from './load.gif';
class Main extends Component{       //classe Main da pagina principal recebe a herança da classe componente  

state={                     //variaveis de estado declaradas
    product:[], //array
    productInfo:{},//objeto
    page:Number,//inteiro
    count:Number,//inteiro
    categoria:localStorage.getItem('@hutweb/categoria')||0,
    marca:localStorage.getItem('@hutweb/marca')||0,
    load:true,

    }

componentDidMount(){    
                  //ciclo de vida do componente invocado depois de renderiza      
    const{count}=this.props;   
             //a variavel count recebe o valor inteiro indicado qual pagina o usuario para o redux
    let ca = localStorage.getItem('@hutweb/categoria');         
    let ma = localStorage.getItem('@hutweb/marca');    
    ca=Number(ca);
    ma=Number(ma);     
     


    this.setState({page:count,categoria:ca,marca:ma}) 
    
    
    const {categoria,marca}=this.state;
    this.loadProducts(count,categoria,marca);
    
    
    
    
    //enviamos o parametro para a função loadproducts carrega os produtos daquela pagina 
}


selecaoMenu=(categoriaF,marcaF)=>{

    let cat=categoriaF;
    localStorage.setItem('@hutweb/categoria',cat);


    let mat=marcaF;
    localStorage.setItem('@hutweb/marca',mat);
   
    this.props.dispatch({ type: 'ZERA' }); 
    const{count,}=this.props;             //a variavel count recebe o valor inteiro indicado qual pagina o usuario para o redux
    this.setState({page:count,categoria:categoriaF,marca:marcaF}) 
    this.loadProducts(1,categoriaF,marcaF);  

}



loadProducts=async(page,categoria,marca)=>{
  try{
    const response=await api.get(`${categoria}/${marca}/${page}`);    //pegamos os dados com o axios atraves de um request
     const {docs}=response.data;                                  //transpormamos o array data para a constante docs
     const {...productInfo}=response.data;                        //simultaneamento para productInfo
     this.setState({product:docs,productInfo:productInfo,page:page,load:false}); //setamos a variavel de estado 

  }catch(e){
    this.loadProducts(page,categoria,marca);
  }
     
};

    prevPage=()=>{                       //declaramos a função para retorna pagina
        const {page}=this.state;        // declaramos a constate page que recebe o estado da variavel page 
        if(page===1) return;           // uma simples verificação se a variavel de paginação já esta na pagina inicial se sim retorna
        const pageNumber=page-1;   
        const {categoria,marca}=this.state;    //declaramos a constate pageNumber que recebera o valor de page -1
        this.loadProducts(pageNumber,categoria,marca);  //invocamos a função loadProducts informado qual pagina devo usa 
        this.props.dispatch({ type: 'DECREMENT' });   // atualiza a variavel de controle de pagina no redux
    }

    nextPage=()=>{                            //declaro a função  para ir para proxima pagina
        const {page,productInfo,categoria,marca}=this.state;  //declaro as constates page,producInfo que receberão os valores das variaveis de estado 
        if(page === productInfo.pages)return; // uma estrutura de decisão pergutando se já estamos na ultima pagina das paginações se sim retorna
        const pageNumber = page+1;     
               //caso não seje a ultima pagina declara a constate pageNumber que recebe o valor de page+1
        this.loadProducts(pageNumber,categoria,marca);        //invocamos a  função page loadPRODUCTS informado qual pagina vai carregar 
        this.props.dispatch({ type: 'INCREMENT' });  //atualiza o redux da variavel cont incrementando
    }


    valorInput=async(e)=> {                 //declaramos a  função valorInput como 
    let{value}=e.target;                    //capturamos o valor digitado no formulario  
                    //declaramos a constate page a variavel de estado page
    if(value===""){                         //verificamos se o usuario apagou oque digitou      
    value="SANDÁLIA";                        // definimos que o parametro de busca são todos os vestidos
    }
    this.props.dispatch({ type: 'ZERA' }); 
    const{count,}=this.props;             //a variavel count recebe o valor inteiro indicado qual pagina o usuario para o redux
    this.setState({page:count,categoria:'PESQUISA',marca:value}) 
    this.loadProducts(1,'PESQUISA',value);  




   }



 render(){                                              //declaramos o metodo render do react
const {page,productInfo,load} =this.state;                   // definimos a variavel page e product info que usaremos dentro do metodo
 return (                                               //definimos o método de retorno do react
 <div className='corpo'>      
<div className='corpo1 fixed-top'>  
<div className='corpo2'/>  
 
 </div>
<div className="seach">



<Navbar bg="light" expand="lg">
  <Navbar.Brand href="#home">Categorias</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <NavDropdown title="FEMININO" id="basic-nav-dropdown">
        <NavDropdown.Item onClick={()=> this.selecaoMenu('0','0')} >AZALEIA</NavDropdown.Item>
        <NavDropdown.Item onClick={()=> this.selecaoMenu('0','1')}>GRENDHA</NavDropdown.Item>
        <NavDropdown.Item onClick={()=> this.selecaoMenu('0','2')}>ZAXY</NavDropdown.Item>
        
      </NavDropdown>
         <NavDropdown title="FEMININO INFANTIL" id="basic-nav-dropdown">
         <NavDropdown.Item onClick={()=> this.selecaoMenu('5','2')}>ZAXY</NavDropdown.Item>
        
      </NavDropdown>

      <NavDropdown title="IPANEMA" id="basic-nav-dropdown">
        <NavDropdown.Item onClick={()=> this.selecaoMenu('2','3')}>UNIVERSAL</NavDropdown.Item>
        
      </NavDropdown>
      <NavDropdown title="IPANEMA BABY" id="basic-nav-dropdown">
        <NavDropdown.Item onClick={()=> this.selecaoMenu('3','4')}>UNIVERSAL</NavDropdown.Item>
        </NavDropdown>
      <NavDropdown title="KIDS COM PERSONAGENS E BRIQUEDOS" id="basic-nav-dropdown">
        <NavDropdown.Item onClick={()=> this.selecaoMenu('4','5')}>UNIVERSAL</NavDropdown.Item>
        </NavDropdown> 
      <NavDropdown title="MASCULINO" id="basic-nav-dropdown">
        <NavDropdown.Item onClick={()=> this.selecaoMenu('1','6')}>CARTAGO AD</NavDropdown.Item>
        <NavDropdown.Item onClick={()=> this.selecaoMenu('1','7')}>CARTAGO INFANTIL E BABY</NavDropdown.Item>
        <NavDropdown.Item onClick={()=> this.selecaoMenu('1','8')}>MORMAII AD</NavDropdown.Item>
        <NavDropdown.Item onClick={()=> this.selecaoMenu('1','9')}>RIDE AD</NavDropdown.Item>
        <NavDropdown.Item onClick={()=> this.selecaoMenu('1','10')}>RIDER INFANTIL E BABY</NavDropdown.Item>
      </NavDropdown> 

      <Form className="d-flex">
      <FormControl
        type="search"
        placeholder="Digite o Código"
        onChange={this.valorInput}
        className="mr-2"
        aria-label="Search"
      />
      
    </Form>




    </Nav>
   
  </Navbar.Collapse>
</Navbar>




</div>


{load===true ? (<div className='centralizado'><img className='rotating' src={img} alt='' prop=''></img></div>):(<div><Products  products={this.state.product}/><Link to={`/carrinho`}><i className='fa fa-shopping-cart fa-3x fixed-top d-flex justify-content-end'></i></Link></div> )}

{load===true ? (<div></div>):(<div className="act fixed-bottom d-flex justify-content-center"><div className="peso"/><button disabled={page===1} onClick={this.prevPage}>Anterior</button><button disabled={page===productInfo.pages} onClick={this.nextPage}>Próximo</button></div>)}


</div>
);
}
}


function mapStateToProps(state) { // declaramos a função que recebe o valor de conter do redux counter
      return {count: state.counter.count}; // retorna o valor de retorno a variavel de estado count
  }  


export default connect(mapStateToProps)(Main);      //conecatamos a função mapstateProps ao redux usado connect na classe Main 