import React, {Component} from "react";
// melakukan request http
import axios from "axios";
// memberi informasi dalam bentuk text
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";

class User extends Component {
  constructor() {
      // menyiapkan tempat untuk inisialisasi state
    super();
    this.state = {
      user: [],
      id_user: "",
      nama_user: "",
      username: "",
      password: "",
      action: "",
      find: "",
      message: ""
    }

    //jika tidak terdapat data token pada local storage
    if(!localStorage.getItem("Token")){
      //directke hlm login
      window.location = "/login";
    }
  }

  bind = (event) => {
    // fungsi untuk membuka form tambah data
    this.setState({[event.target.name] : event.target.value});
  }

  Add = () => {
    // fungsi untuk membuka form edit data
    //membuka modal
    $("#modal_user").modal("show");
    //mengosongkan data pada form
    this.setState({
      action: "insert",
      id_user: "",
      nama_user: "",
      username: "",
      password: ""
    });
  }

  Edit = (item) => {
    //membuka modal
    $("#modal_user").modal("show");
    //megisikan data pada form
    this.setState({
      action: "update",
      id_user: item.id_user,
      nama_user: item.nama_user,
      username: item.username,
      password: item.password
    });
  }

  get_user = () => {
    $("#loading").toast("show");
    let url = "http://localhost:8080/pelanggaran_sekolah/public/user";
    // memanggil url sesuai yang diinginkan
    axios.get(url)
    .then(response => {
      this.setState({user: response.data.user});
      // setState : saat sudah merespon kita mengubah nilai state (data) dengan mengisi data lewat response.data.buku
      $("loading").toast("hide");
    })
    .catch(error => {
      console.log(error);
    });
  }

  Drop = (id) => {
    // berisi function yang digunakan untuk mengahpus data
    if (window.confirm("Apakah anda yakin ingin mengahpus data ini?")) {
      $("#loading").toast("show");
      let url = "http://localhost:8080/pelanggaran_sekolah/public/user/drop/"+id;
      axios.delete(url)
      .then(response => {
        $("#loading").toast("hide");
        this.setState({message: response.data.message});
        $("#message").toast("show");
        this.get_user();
      })
      .catch(error => {
        // bila gagal masuk blok catch
        console.log(error);
          // akan muncul di console bagian browser pada inspect elemen->console
      });
    }
  }

  componentDidMount = () => {
      // memanggil sebuah data
    this.get_user();
  }

  Save = (event) => {
    // berisi function yang digunakan untuk menyimpan data
    event.preventDefault();
    // meanmplkan proses loading
    $("#loading").toast("show");
    //menurtup form modal
    $("#modal_user").modal("hide");
    let url = "http://localhost:8080/pelanggaran_sekolah/public/user/save";
    let form = new FormData();
    form.append("action", this.state.action);
    // append= memasukkan item ke form data
    form.append("id_user", this.state.id_user);
    form.append("nama_user", this.state.nama_user);
    form.append("username", this.state.username);
    form.append("password", this.state.password);
    axios.post(url, form)
    .then(response => {
      $("#loading").toast("hide");
      this.setState({message: response.data.message});
      $("#message").toast("show");
      this.get_user();
    })
    .catch(error => {
        // bila gagal masuk blok catch
      console.log(error);
      // akan muncul di console bagian browser pada inspect elemen->console
    });
  }

  search = (event) => {
    if (event.keyCode === 13) {
      $("#loading").toast("show");
      let url = "http://localhost:8080/pelanggaran_sekolah/public/user";
      let form = new FormData();
      // formdata : untuk membungkus data yang akan dikirim melalui api
      form.append("find", this.state.find);
      // append= memasukkan item ke form data
      axios.post(url, form)
      .then(response => {
        $("#loading").toast("hUseride");
        this.setState({user: response.data.user});
      })
      .catch(error => {
          // bila gagal masuk blok catch
        console.log(error);
        // akan muncul di console bagian browser pada inspect elemen->console
      });
    }
  }

  render(){
    // berifi function yang akan menampilkan elemen pada halaman web
    return(
      <div className="container">
        <div className="card mt-2">
          {/* header card */}
          <div className="card-header bg-success">
            <div className="row">
              <div className="col-sm-8">
                <h4 className="text-white">Data User</h4>
              </div>
              <div className="col-sm-4">
                <input type="text" className="form-control" name="find"
                  onChange={this.bind} value={this.state.find} onKeyUp={this.search}
                  placeholder="Pencarian..." />
              </div>
            </div>

          </div>
          {/* content card */}
          <div className="card-body">
            <Toast id="message" autohide="true" title="Informasi">
              {this.state.message}
            </Toast>
            <Toast id="loading" autohide="false" title="Informasi">
              <span className="fa fa-spin fa-spinner"></span> Sedang Memuat
            </Toast>
            <table className="table">
              <thead>
                <tr>
                      <th>E-mail</th>
                      <th>Username</th>

                      <th>Option</th>
                </tr>
              </thead>
              <tbody>
                { this.state.user.map((item) => {
                  return(
                    <tr key={item.id_user}>
                      <td>{item.nama_user}</td>
                      <td>{item.username}</td>

                      <td>
                        <button className="m-1 btn btn-sm btn-info" onClick={() => this.Edit(item)}>
                          <span className="fa fa-edit"></span>
                        </button>
                        <button className="m-1 btn btn-sm btn-danger"
                          onClick={() => this.Drop(item.id_user)}>
                          <span className="fa fa-trash"></span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* tombol tambah */}
              <button className="btn btn-success my-2" onClick={this.Add}>
                <span className="fa fa-plus"></span> Tambah Data
              </button>

            {/* form modal siswa*/}
              <Modal id="modal_user" title="Form User" bg_header="success" text_header="white">
                <form onSubmit={this.Save}>
                    Nama
                  <input type="text" className="form-control" name="nama_user"
                      value={this.state.nama_user} onChange={this.bind} required />
                    Username
                  <input type="text" className="form-control" name="username"
                      value={this.state.username} onChange={this.bind} required />
                    Password
                  <input type="password" className="form-control" name="password" value={this.state.password}
                      onChange={this.bind} required />
                  <button type="submit" className="btn btn-info pull-right m-2">
                    <span className="fa fa-check"></span> Simpan
                  </button>
                </form>
              </Modal>
            </div>
          </div>

        </div>
      );
    }
  }


export default User;
// dibuat agar kelas yang dibuat bisa diakses oleh kelas lain
