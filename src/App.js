import {useEffect, useState} from 'react';
import './App.css';

function App() {
  const [contatos,setContatos] = useState([
   /* {nome: 'Antonio', telefone: '81 99999-9999', imagem: '/avatar.png'},
    {nome: 'Brien', telefone: '81 98888-9999', imagem: '/avatar.png'},
    {nome: 'tiryon', telefone: '81 97777-9999', imagem: '/avatar.png'},
    {nome: 'jonh', telefone: '81 95555-9999', imagem: '/avatar.png'},
    {nome:'jofre', telefone: '81 8888888888', imagem: '/avatar.png'},
    {nome: 'Antonio', telefone: '81 99999-9999', imagem: '/avatar.png'},
    {nome: 'Brien', telefone: '81 98888-9999', imagem: '/avatar.png'},
    {nome: 'tiryon', telefone: '81 97777-9999', imagem: '/avatar.png'},
    {nome: 'jonh', telefone: '81 95555-9999', imagem: '/avatar.png'},
    {nome:'jofre', telefone: '81 8888888888', imagem: '/avatar.png'},*/
]);
  const [nome, setNome]=useState('');
  const [telefone, setTelefone]=useState('');

  const criteriosTelefone = (e)=>{
    const telefoneInput = e.target.value;

    if(telefoneInput.length <= 11){
      setTelefone(telefoneInput)
    }
  };



  function Contatos(){
    return(
    <div className='contato'>
        <ul>
          {contatos.map((contato, i)=>(
            <li key={i}>
              <div className='avatar'>
                <img src={contato.imagem} alt='avatar'></img>
              </div>
              <div className='infor'>
                <strong>{contato.nome}</strong> - {contato.telefone}
              </div>
              <button onClick={()=>excluirContato(i)} className='excluir'>X</button>
            </li>
          ))}
        </ul>
    </div>
  )};

  function excluirContato(index){
    const novaLista = contatos.filter((_, i) => i !== index);
    setContatos(novaLista);
    localStorage.setItem('contatos', JSON.stringify(novaLista));
  }

  function AdicionarContato(){
    if(telefone.length === 11){
      const telefoneFormatado = telefone.replace(/(\d{2})(\d{5})(\d{4})/,
        '($1) $2-$3');
    

    const adicionar = {nome: nome, telefone: telefoneFormatado, imagem: '/avatar.png'};
      // Função para salvar o nome no localStorage
    
    

    const novaLista = ([...contatos, adicionar]);
    setContatos(novaLista);

    localStorage.setItem('contatos', JSON.stringify(novaLista)); // Salva a lista no localStorage

    fecharMenu();
    setNome('');
    setTelefone('');
  }
  else{
  return alert('Numero incorreto')
}
}
  function abrirMenu(){
    let menu =document.querySelector('.menuAdicionar');
    menu.style.display='block'
  }
  function fecharMenu(){
    let menu =document.querySelector('.menuAdicionar');
    menu.style.display='none'
  }

    useEffect(()=>{
      const contatosSalvos = localStorage.getItem('contatos');
      if(contatosSalvos){
        setContatos(JSON.parse(contatosSalvos))
      }
    },[]);

  return (
    <>
    <h1>Lista de Contatos</h1>
    <div className="geral">
      <div className='menuAdicionar'>
        <h1>Novo Contato </h1> <button className='fecharMenu'onClick={fecharMenu}>X</button>
        <div className='inforAdicionar'>
          <input className='nome' placeholder='nome' value={nome} onChange={(e)=>setNome(e.target.value) }></input>
          <input type='number' className='numero' placeholder='Numero' value={telefone} onChange={criteriosTelefone}></input>
          <input type='submit' onClick={AdicionarContato} value='Adicionar Contato'></input>
        </div>
      </div>
      <div className='conta'>
        <Contatos/>
      </div>
      <div className='btAdicionar'><button onClick={abrirMenu}>+</button></div>
    </div>
    </>
  );
}

export default App;
