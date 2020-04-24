<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Motor extends Model
{
    protected $table = "motor";
    protected $primaryKey = "id__motor";
    protected $fillable = ["id__motor","nama_penyewa","jenis_motor","tahun"];
}
