import React, {Component} from "react";
// melakukan request http
import axios from "axios";
// memberi informasi dalam bentuk text
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";

class Motor extends Component {
  constructor() {
    // menyiapkan tempat untuk inisialisasi state
    super();
    this.state = {
      motor: [],
      id_motor: "",
      nama_pemilik: "",
      jenis_motor: "",
      tahun: "",
      action: "",
      find: "",
      message: ""
    }

    // jika tidak terdapat data token pada local storage
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
    $("#modal_motor").modal("show");
    //mengosongkan data pada form
    this.setState({
      action: "insert",
      id_motor: "",
      nama_pemilik: "",
      jenis_motor: "",
      tahun: ""
    });
  }

  Edit = (item) => {
    //membuka modal
    $("#modal_motor").modal("show");
    //megisikan data pada form
    this.setState({
      action: "update",
      id_motor: item.id_motor,
      nama_pemilik: item.nama_pemilik,
      jenis_motor : item.jenis_motor,
      tahun: item.tahun
    });
  }

  get_motor = () => {
    $("#loading").toast("show");
    let url = "http://localhost:8080/richedb/public/motor";
    // menghubungkan ke url yang diinginkan
    axios.get(url)
    .then(response => {
      this.setState({motor: response.data.motor});
      $("loading").toast("hide");
    })
    .catch(error => {
      // bila gagal masuk blok catch
      console.log(error);
        // akan muncul di console bagian browser pada inspect elemen->console
    });
  }

  Drop = (id) => {
    if (window.confirm("Apakah anda yakin ingin mengahpus data ini?")) {
      $("#loading").toast("show");
      let url = "http://localhost:8080/richedb/public/motor/drop/"+id
      // menghubungkan ke url yang diinginkan
      axios.delete(url)
      .then(response => {
        $("#loading").toast("hide");
        this.setState({message: response.data.message});
        $("#message").toast("show");
        this.get_motor();
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
    this.get_motor();
  }

  Save = (event) => {
    event.preventDefault();
    // meanmplkan proses loading
    $("#loading").toast("show");
    //menurtup form modal
    $("#modal_motor").modal("hide");
    let url = "http://localhost:8080/richedb/public/motor/save";
    let form = new FormData();
    form.append("action", this.state.action);
    form.append("id_motor", this.state.id_motor);
    form.append("nama_pemilik", this.state.nama_pemilik);
    form.append("jenis_motor", this.state.jenis_motor);
    form.append("tahun", this.state.tahun);
    axios.post(url, form)
    .then(response => {
      $("#loading").toast("hide");
      this.setState({message: response.data.message});
      $("#message").toast("show");
      this.get_motor();
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
      let url = "http://localhost:8080/richedb/public/motor";
      let form = new FormData();
      form.append("find", this.state.find);
      axios.post(url, form)
      .then(response => {
        $("#loading").toast("hide");
        this.setState({motor: response.data.motor});
      })
      .catch(error => {
          // bila gagal masuk blok catch
        console.log(error);
          // akan muncul di console bagian browser pada inspect elemen->console
      });
    }
  }

  render(){
    return(
      <div className="container">
        <div className="card mt-2">
          {/* header card */}
          <div className="card-header bg-info">
            <div className="row">
              <div className="col-sm-8">
                <h4 className="text-black">Data Motor</h4>
              </div>
              <div className="col-sm-4">
                <input type="text" className="form-control" name="find"
                  onChange={this.bind} value={this.state.find} onKeyUp={this.search}
                  placeholder="Search" />
              </div>
            </div>

          </div>
          {/* content card */}
          <div className="card-body">
            <Toast id="message" autohide="true" title="Informasi">
              {this.state.message}
            </Toast>
            <Toast id="loading" autohide="false" title="Informasi">
              <span className="fa fa-spin fa-spinner"></span> Loading
            </Toast>
            <table className="table">
              <thead>
                <tr>
                      <th>Nama Pemilik</th>
                      <th>Jenis</th>
                      <th>Tahun</th>
                      <th>Option</th>
                </tr>
              </thead>
              <tbody>
                { this.state.motor.map((item) => {
                  return(
                    <tr key={item.id_motor}>
                      <td>{item.nama_pemilik}</td>
                      <td>{item.jenis_motor}</td>
                      <td>{item.tahun}</td>
                      <td>
                        <button className="m-1 btn btn-sm btn-info" onClick={() => this.Edit(item)}>
                          <span className="fa fa-edit"></span>
                        </button>
                        <button className="m-1 btn btn-sm btn-danger"
                          onClick={() => this.Drop(item.id_motor)}>
                          <span className="fa fa-trash"></span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* tombol tambah */}
              <button className="btn btn-info my-2" onClick={this.Add}>
                <span className="fa fa-plus"></span> Tambah Data
              </button>

            {/* form modal siswa*/}
              <Modal id="modal_motor" title="Form Motor" bg_header="success" text_header="white">
                <form onSubmit={this.Save}>
                    Nama
                  <input type="text" className="form-control" name="nama_pemilik"
                      value={this.state.nama_pemilik} onChange={this.bind} required />
                    Jenis Motor
                  <input type="text" className="form-control" name="jenis_motor"
                      value={this.state.jenis_motor} onChange={this.bind} required />
                    Tahun
                  <input type="text" className="form-control" name="tahun"
                        value={this.state.tahun} onChange={this.bind} required />

                  <button type="submit" className="btn btn-info pull-right m-2">
                    <span className="fa fa-check"></span> save
                  </button>
                </form>
              </Modal>
            </div>
          </div>

        </div>
      );
    }
  }


export default Motor;
// dibuat agar kelas yang dibuat bisa diakses oleh kelas lain
