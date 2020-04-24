import React, {Component} from "react";
// melakukan request http
import axios from "axios";
// memberi informasi dalam bentuk text
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";

class Penyewa extends Component {
  constructor() {
    // menyiapkan tempat untuk inisialisasi state
    super();
    this.state = {
      penyewa: [],
      id_penyewa: "",
      nama_penyewa: "",
      alamat: "",
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
    $("#modal_penyewa").modal("show");
    //mengosongkan data pada form
    this.setState({
      action: "insert",
      id_penyewa: "",
      nik: "",
      nama_penyewa: "",
      alamat: ""
    });
  }

  Edit = (item) => {
    //membuka modal
    $("#modal_penyewa").modal("show");
    //megisikan data pada form
    this.setState({
      action: "update",
      id_penyewa: item.id_penyewa,
      nik: item.nik,
      nama_penyewa: item.nama_penyewa,
      alamat : item.alamat,
      poin: item.poin
    });
  }

  get_penyewa = () => {
    $("#loading").toast("show");
    let url = "http://localhost:8080/richedb/public/penyewa";
    // menghubungkan ke url yang diinginkan
    axios.get(url)
    .then(response => {
      this.setState({penyewa: response.data.penyewa});
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
      let url = "http://localhost:8080/richedb/public/penyewa/drop/"+id
      // menghubungkan ke url yang diinginkan
      axios.delete(url)
      .then(response => {
        $("#loading").toast("hide");
        this.setState({message: response.data.message});
        $("#message").toast("show");
        this.get_penyewa();
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
    this.get_penyewa();
  }

  Save = (event) => {
    event.preventDefault();
    // meanmplkan proses loading
    $("#loading").toast("show");
    //menurtup form modal
    $("#modal_penyewa").modal("hide");
    let url = "http://localhost:8080/richedb/public/penyewa/save";
    let form = new FormData();
    form.append("action", this.state.action);
    form.append("id_penyewa", this.state.id_penyewa);
    form.append("nik", this.state.nik);
    form.append("nama_penyewa", this.state.nama_penyewa);
    form.append("alamat", this.state.alamat);
    axios.post(url, form)
    .then(response => {
      $("#loading").toast("hide");
      this.setState({message: response.data.message});
      $("#message").toast("show");
      this.get_penyewa();
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
      let url = "http://localhost:8080/richedb/public/penyewa";
      let form = new FormData();
      form.append("find", this.state.find);
      axios.post(url, form)
      .then(response => {
        $("#loading").toast("hide");
        this.setState({penyewa: response.data.penyewa});
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
                <h4 className="text-black">Data Penyewa</h4>
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
              <span className="fa fa-spin fa-spinner"></span> Loading
            </Toast>
            <table className="table">
              <thead>
                <tr>
                      <th>NIK</th>
                      <th>Nama</th>
                      <th>Alamat</th>
                      <th>Option</th>
                </tr>
              </thead>
              <tbody>
                { this.state.penyewa.map((item) => {
                  return(
                    <tr key={item.id_penyewa}>
                      <td>{item.nik}</td>
                      <td>{item.nama_penyewa}</td>
                      <td>{item.alamat}</td>
                      <td>
                        <button className="m-1 btn btn-sm btn-info" onClick={() => this.Edit(item)}>
                          <span className="fa fa-edit"></span>
                        </button>
                        <button className="m-1 btn btn-sm btn-danger"
                          onClick={() => this.Drop(item.id_penyewa)}>
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
              <Modal id="modal_penyewa" title="Form Penyewa" bg_header="success" text_header="white">
                <form onSubmit={this.Save}>
                  NIK
                  <input type="text" className="form-control" name="nik" value={this.state.nik}
                      onChange={this.bind} required />
                    Nama
                  <input type="text" className="form-control" name="nama_penyewa"
                      value={this.state.nama_penyewa} onChange={this.bind} required />
                    Alamat
                  <input type="text" className="form-control" name="alamat"
                      value={this.state.alamat} onChange={this.bind} required />
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


export default Penyewa;
// dibuat agar kelas yang dibuat bisa diakses oleh kelas lain
