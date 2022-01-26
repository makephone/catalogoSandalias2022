import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import './style.css'; 

export default class Imagem extends Component {

state={
    loaded:false,
 }

render() {
const source = this.props.source;
const titulo = this.props.titulo;


return (

    <div>

    {this.state.loaded ? null :
         <ReactLoading className='imagemspin' type="spin" color="#00b0ff" height={260} width={260} />
      }

<TransformWrapper>
 



       {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
          <React.Fragment>
               <TransformComponent>
            <img
          style={this.state.loaded ? {} : {display: 'none'}}
          alt={titulo}
          src={source}
          onLoad={() => this.setState({loaded: true})}
          />
              
            </TransformComponent>
            
            {this.state.loaded===false ? null :
         <div className="tools">
         <button onClick={() => zoomIn()}><i className='fa fa-search-plus fa-xs' aria-hidden='true'></i></button>
         <button onClick={() => resetTransform()}><i className='fa fa-ban fa-xs' aria-hidden='true'></i></button>
         <button onClick={() => zoomOut()}><i className='fa fa-search-minus fa-xs' aria-hidden='true'></i></button>              
         </div>
          }



          </React.Fragment>
        )}









</TransformWrapper>
   </div>       

  )}}