<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Penyewa extends Model
{
    protected $table = "penyewa";
    protected $primaryKey = "id__penyewa";
    protected $fillable = ["id_penyewa","nik","nama_penyewa","alamat"];
}
