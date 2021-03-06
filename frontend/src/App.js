
import './App.css';
import React,{ Component } from "react";
import axios from "axios";

const candidatoAPI = axios.create({
  baseURL: "https://vanessa-jobsnet-backend.netlify.app/.netlify/functions/api"
});

class App extends Component{
  
  constructor(props){
    super(props);  
      this.state = {
        nome: "",
        profissao: "", 
        formacaoAcademica:"",
        identidade: "",
        cargoPretendido:"",
        cpf: "",
        estadoCivil: "",
        sexo:"",
        endereco:{
          cep:"",
          logradouro:"",
          cidade:""},
        telefone:"",
        celular: "",
        email:"",
        habilitacao: "sim",
        veiculo: "sim",
        confirmacao: false,
      };

      this.handleSubmit = (event)=> {
        event.preventDefault();
        console.log(this.state)
        candidatoAPI.post("/candidato", this.state).then(response => {
          console.log(response)
          alert("Gravado com sucesso")
        }).catch (error => { 
          console.log(error)
          alert(error.response.data)
        })
      }

      this.changeName = (event)=> {
        this.setState({nome: event.target.value.toUpperCase()})
      }

      this.changeProfissao = (event)=> {
        this.setState({profissao: event.target.value})
      }
      this.changeFormacaoAcademica = (event)=> {
        this.setState({formacaoAcademica: event.target.value})
      }

      this.changeCargoPretendido = (event) => {
        this.setState({cargoPretendido: event.target.value})
      }

      this.changeIdentidade = (event)=> {
        this.setState({identidade: event.target.value})
      }

      this.changeCpf = (event)=> {
        this.setState({cpf: event.target.value})
      }

      this.changeEstadoCivil = (event)=> {
        this.setState({estadoCivil: event.target.value})
      }

      this.changeSexo = (event)=> {
        this.setState({sexo: event.target.value})
      }

      this.changeEndereco = (event)=> {
        let { endereco } = this.state
        endereco.logradouro = event.target.value
        this.setState({endereco: endereco})
      }

      this.changeCidade = (event)=> {
        let { endereco } = this.state
        endereco.cidade = event.target.value
        this.setState({endereco: endereco})
      }

      this.changeBairro = (event)=> {
        let { endereco } = this.state
        endereco.bairro = event.target.value
        this.setState({endereco: endereco})
      }

      this.changeNumero = (event)=> {
        let { endereco } = this.state
        endereco.numero = event.target.value
        this.setState({endereco: endereco})
      }

      this.changeEstado = (event)=> {
        let { endereco } = this.state
        endereco.estado = event.target.value
        this.setState({endereco: endereco})
      }

      this.changeCep = (event)=> {
        let { endereco } = this.state
        endereco.cep = event.target.value
        this.setState({endereco: endereco})

        candidatoAPI.get("/endereco/"+event.target.value)
        .then(response => {
          let { localidade, logradouro, cep, bairro, uf} = response.data

          this.setState({endereco: { 
            cidade: localidade, 
            logradouro: logradouro, 
            estado: uf,
            bairro,
            numero: endereco.numero,
            cep}})
        }).catch (error => { 
          console.log(error)
        })
      }

      this.changeTelefone = (event)=> {
        this.setState({telefone: event.target.value})
      }

      this.changeCelular = (event)=> {
        this.setState({celular: event.target.value})
      }

      this.changeEmail = (event)=> {
        this.setState({email: event.target.value})
      }

      this.changeVeiculo= (event)=> {
        this.setState({veiculo: event.target.value})
      }

      this.changeHabilitacao = (event)=> {
        this.setState({habilitacao: event.target.value})
      }

      this.changeCheckbox = (event)=> {
        this.setState({confirmacao: event.target.checked})
      }

      this.changeDataDeNascimento = (event) => { 
        this.setState({dataDeNascimento: event.target.value})
      }
    }

  render(){
    return(
      <>
        <h1>Formul??rio de inscri????o</h1>
        <form onSubmit={this.handleSubmit}>
        <div className="container">
            <label className="required">Profiss??o</label><br/>
            <input className="box" type="text" placeholder="Desenvolvedor Full Stack" value= {this.state.profissao} onChange={this.changeProfissao} />
          </div>

          <div className="container">
            <label>Forma????o</label><br/>
            <select value={this.state.formacaoAcademica} onChange={this.changeFormacaoAcademica}>
              <option></option>
              <option>Ensino Fundamental Incompleto</option>
              <option>Ensino Fundamental Cursando</option>
              <option>Ensino Fundamental Completo</option>
              <option>Ensino M??dio Incompleto</option>
              <option>Ensino M??dio Cursando</option>
              <option>Ensino M??dio Completo</option>
              <option>Ensino Superior Incompleto</option>
              <option>Ensino Superior Cursando</option>
              <option>Ensino Superior Completo</option>
              <option>P??s Gradua????o</option>
              <option>MBA</option>
              <option>Mestrado</option>
              <option>Doutorado</option>
            </select>
          </div>
          
          <div className="container">
            <label>Cargo Pretendido</label><br/>
            <select value={this.state.cargoPretendido} onChange={this.changeCargoPretendido}>
            <option></option>
              <option>Desenvolvedor Full Stack</option>
              <option>Especialista em Cloud</option>
              <option>Analista de Suporte e Service Desk</option>
              <option>Engenheiro de Software</option>
              <option>Analista de Seguran??a de Informa????o</option>
              <option>Analista de Sistemas</option>
              <option>Administrador do Banco de Dados</option>
              <option>Administrador de Sistemas</option>
              <option>Gestor de Tecnologias da Informa????o</option>
              <option>Arquiteto de Redes de Inform??tica</option>
              <option>Programador de jogos</option>
          </select>
          </div>

          <div className="container">
            <label className="required">Nome Completo</label><br/>
              <input type="text" name="nome" value= {this.state.nome} onChange={this.changeName} />
          </div>

          <div className="container">
            <label>Identidade</label><br/>
              <input type="text" value= {this.state.identidade} onChange={this.changeIdentidade} />
          </div>

          <div className="container">      
            <label className="required">CPF</label><br/>
              <input type="text" onChange={this.changeCpf} />
          </div>

          <div className="container">
            <label className="required">Data de Nascimento</label><br/>
            <input className="birthdate" type="date" placeholder="YYYY-MM-DD" data-date-split-input="true" onChange={this.changeDataDeNascimento}/>
          </div>

          <div className="container">
            <label>Estado Civil</label><br/>
            <select value={this.state.estadoCivil} onChange={this.changeEstadoCivil}>
              <option></option>
              <option>Solteira(o)</option>
              <option>Casada(o)</option>
              <option>Divorciada(o)</option>
              <option>Vi??va(o)</option>
            </select>
          </div> 

          <div className="container">
            <label>Sexo</label><br/>
            <select value={this.state.sexo} onChange={this.changeSexo}>
              <option></option>
              <option>Feminino</option>
              <option>Masculino</option>
            </select>
          </div>

          <div className="container">
            <label className="required">Cep</label><br/>
            <input type="text" value= {this.state.endereco.cep} onChange={this.changeCep} />
          </div>

          <div className="container">
            <label className="required">Endere??o</label><br/>
            <input type="text" value= {this.state.endereco.logradouro} onChange={this.changeEndereco} />
          </div>

          <div className="container"> 
            <label className="required">Cidade</label><br/>
            <input type="text" value= {this.state.endereco.cidade} onChange={this.changeCidade} />
          </div>

          <div className="container"> 
            <label className="required">Bairro</label><br/>
            <input type="text" value= {this.state.endereco.bairro} onChange={this.changeBairro} />
          </div>

          <div className="container"> 
            <label className="required">Numero</label><br/>
            <input type="text" value= {this.state.endereco.numero} onChange={this.changeNumero} />
          </div>

          <div className="container"> 
            <label className="required">Estado (UF)</label><br/>
            <input type="text" value= {this.state.endereco.estado} onChange={this.changeEstado} />
          </div>

          <div className="container">
            <label className="label">Telefone</label><br/>
            <input type="text" value= {this.state.telefone.replace(/\D/,'')} onChange={this.changeTelefone} />
          </div>
          
          <div className="container">      
            <label className="required">Celular</label><br/>
            <input type="text"  value= {this.state.celular.replace(/\D/,'')} onChange={this.changeCelular} />
          </div>

          <div className="container">   
            <label className="required">E-mail</label><br/>
            <input type="text" placeholder="exemplo@abc.com.br" value= {this.state.email} onChange={this.changeEmail} />
          </div>

          <div className="container">
            <label>Possui Ve??culo</label><br/>
            <input type="radio" checked={this.state.veiculo === "sim"} onChange={this.changeVeiculo} value = "sim" /> Sim 
            <input type="radio" checked={this.state.veiculo === "n??o"} onChange={this.changeVeiculo} value = "n??o" /> N??o
          </div>

          <div className="container">
            <label>Possui Habilita????o </label><br/>
            <input type="radio" checked={this.state.habilitacao === "sim"} onChange={this.changeHabilitacao} value = "sim" /> Sim 
            <input type="radio" checked={this.state.habilitacao === "n??o"} onChange={this.changeHabilitacao} value = "n??o" /> N??o
          </div>

          <div className="container">
            <input type="checkbox" checked={this.state.confirmacao} onChange={this.changeCheckbox} />
            <label>Declaro que as informa????es acima s??o verdadeiras.</label>
          </div>

          <div className="btEnviar">
            <button>FINALIZAR INSCRI????O</button>
          </div>
        </form>
      </>
    )
  }
}

export default App;