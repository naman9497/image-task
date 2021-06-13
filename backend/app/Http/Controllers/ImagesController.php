<?php

namespace App\Http\Controllers;

use App\Models\Images;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImagesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Images::all('name', 'file_name', 'location');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        request()->validate([
            
            'name' => 'required',
            
            'file' => 'required',
            
            'file_name' => 'required',

            'location' => 'required'
        ]);
 
        $file = Storage::put(request('file_name'), request('file'));
        if($file){
            $path =  Storage::path(request('file_name'));
            $extension = pathinfo($path, PATHINFO_EXTENSION);
            $size =  Storage::size($path);
            $data = getimagesize($path);
            $width = $data[0];
            $height = $data[1];
            $image = new Images(array(
                'height' => $height,
                'width' => $width,
                'size' =>  $size,
                'extension' => $extension,
                'file_name' => request('file_name'),
                'name' => request('name'),
                'location' => request('location'),
            ));
            $image->save();
            return $image;
        }

 
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Images  $images
     * @return \Illuminate\Http\Response
     */
    public function show(Images $images)
    {
        //
    }

 

 
}
