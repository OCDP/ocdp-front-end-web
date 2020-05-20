import React, {Component} from 'react';
import logo from "../../images/logo/logo_m.png";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nome: '',
            cpf: '',
            senha: '',
            perfil: ''
        };
        this.entrar = this.entrar.bind(this);
    }

    entrar() {
        /**
         * Criar regra de negócios aqui após logar na API http://api-ocdp.us-east-2.elasticbeanstalk.com:8080/api/usuario/basicauth
         * curl -X GET http://ec2-3-20-202-13.us-east-2.compute.amazonaws.com:8080/api/usuario/byCpf/111.111.111-11"
         * Login 111.111.111-11 Senha: p@55w0Rd
         * Login do 222.222.222-22 Senha: teste123
         *
         * Response body
         * {
         * "id": "2",
         * "cpf": "111.111.111-11",
         * "nome": "Carlos",
         * "status": "ATIVO",
         * "email": "leandropedrosalp@gmail.com",
         * "telefone": "62992017672",
         * "nivelAtencao": "PRIMARIA",
         * "tipoUsuario": "DENTISTA"
         * }
         *
         * Response headers
         * cache-control: no-cache, no-store, max-age=0, must-revalidate
         * content-disposition: inline;filename=f.txt
         * content-type: application/json;charset=UTF-8
         * date: Wed, 22 Apr 2020 00:40:35 GMT
         * expires: 0
         * pragma: no-cache
         * transfer-encoding: chunked
         * x-content-type-options: nosniff
         * x-frame-options: DENY
         * x-xss-protection: 1; mode=block
         */
        if (this.state.cpf === '11111111111' && this.state.senha === '123') {
            this.setState({nome: 'Dáurio'});
            this.setState({perfil: ''});
            localStorage.setItem("usuarioLogado", this.state)

        } else {
            alert('Login ou senha incoretos.');
        }
    }

    render() {
        return (
            <div className="container">
                <center>
                    <div className="row espacoAcima50 fundo_branco_login sombraBox">
                        <div className="account-col text-center">
                            <img src={logo} alt="OCDP - ORAL CANCER DECTECT PROJECT"
                                 title="OCDP - ORAL CANCER DECTECT PROJECT"/>
                            <h3 className="espacoAcima20">Seja bem vindo! Faça o login na sua conta.</h3>
                            <form id="form" className="m-t espacoAcima20">
                                <div className="form-group espacoAcima10">
                                    <input type="number" className="form-control"
                                           placeholder="CPF" id="cpf" maxLength="11"
                                           value={this.state.cpf}
                                           onChange={(event) => this.setState({cpf: event.target.value})}/>
                                </div>
                                <div className="form-group">
                                    <input type="password" value={this.state.senha} className="form-control"
                                           placeholder="Senha" id="senha"
                                           onChange={(event) => this.setState({senha: event.target.value})}/>
                                </div>
                                <a href="#" className="col-md-6 login-left">
                                    <input type="checkbox" title=" Lembre-me"></input>
                                    Lembre-me</a>
                                <a href="#" className="col-md-6 login-right">Esqueci minha
                                    senha</a>
                                <br/><br/><br/>
                                <button onClick={() => this.entrar()}
                                        className="btn btn-lg btn-primary col-md-5 linkHover border-radius-login"
                                        id="logar">Login
                                </button>
                                <a className="btn btn-lg btn-default col-md-5 border-radius-login-float"
                                   href="#">Cadastre-se</a> <br/><br/><br/>
                                <p className="centro cor-branca">
                                    Oral Cancer Dectect Project 2020
                                </p>
                            </form>
                        </div>
                    </div>
                </center>
            </div>
        );
    }
}

export default Login;
