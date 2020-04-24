import React, {Component} from "react";
// melakukan request http
import axios from "axios";
// memberi informasi dalam bentuk text
import Toast from "../component/Toast";
import $ from "jquery";

class Login extends Component {
    constructor() {
      // menyiapkan tempat untuk inisialisasi state
        super();
        this.state = {
            username: "",
            password: "",
            message: ""
        }
    }

    bind = (event) => {
      // menghubungkan state dan element
        this.setState({[event.target.name]: event.target.value});
    }

    Login = (event) => {
        event.preventDefault();
        let url = "http://localhost:8080/richedb/public/user/auth";
        // apabila ingin mask halaman ini akan menuju url yang dsebutkan
        let form = new FormData();
        // membungkus data yang akan dikirim melalui api
        form.append("username", this.state.username);
        // append= memasukkan item ke form data
        form.append("password", this.state.password);
        axios.post(url, form)
        .then(response => {
            let logged = response.data.status;
            if (logged) {
                this.setState({message: "Login Berhasil"});
                //setState = saat sudah merespon kita mengubah nilai state (data) dengan mengisi data
                localStorage.setItem("Token", response.data.token);
                // variabel yang didapatkan setelah melakukan panggilan terhadap
                // API atau responnya get merupakan method
                localStorage.setItem("user", JSON.stringify(response.data.user));
                window.location = "/penyewa";
            } else {
                this.setState({message: "Login Gagal"});
                // memberi pop up jika login gagal
            }
            $("#message").toast("show");
        })
        .catch(error => {
          // bila gagal masuk blok catch
            console.log(error);
            // akan muncul di console bagian browser pada inspect elemen->console
        });
    }

    render(){
      // berifi function yang akan menampilkan elemen pada halaman web
        return(
            <div className="container" style={{marginTop: "15%", width: "50%"}}>
                <div className="card my-2">
                    <div className="card-header bg-success">
                        <h5 className="text-white">Login User</h5>
                    </div>
                    <div className="card-body">
                        <Toast id="message" autohide="false" title="Informasi">
                            {this.state.message}
                        </Toast>
                        <form onSubmit={this.Login}>
                            <input type="text" className="form-control m-1" name="username"
                            value={this.state.username} onChange={this.bind}
                            required placeholder="Masukkan Username" />
                            <input type="password" className="form-control m-1" name="password"
                            value={this.state.password} onChange={this.bind}
                            required placeholder="Masukkan Password"></input>
                        <button className="mt-2 btn btn-block btn-success" type="submit">
                            <span className="fa fa-sign in"></span> Login
                        </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
// dibuat agar kelas yang dibuat bisa diakses oleh kelas lain
