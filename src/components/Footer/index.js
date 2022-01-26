import React from 'react';
import './styles.css';
const Footer =() =>(
<footer className='rodape'>
<div className='container'>
<h1>PED APP</h1>
<ul className="rodape-lista">
<li className='rodape-lista-item icone-twitter'>
<div className='ico'>
<i className='fa fa-twitter' aria-hidden='true'></i>
</div >
</li>
<li className='rodape-lista-item icone-facebook'>
<div className='ico'>
<i className='fa fa-facebook-official' aria-hidden='true'></i>
</div>
</li>
<li className='rodape-lista-item icone-instagram'>
<div className='ico'>
<i className='fa fa-instagram' aria-hidden='true'></i>
</div>
</li>
</ul>
</div>
</footer>
);

export default Footer;