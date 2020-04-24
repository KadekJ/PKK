<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pemilik extends Model
{
    protected $table = "pemilik";
    protected $primaryKey = "id__pemilik";
    protected $fillable = ["id_pemilik","nama_pemilik","alamat","telepon"];
}
