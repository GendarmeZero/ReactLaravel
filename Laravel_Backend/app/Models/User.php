<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Str;
use Tymon\JWTAuth\Contracts\JWTSubject;


class User extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'email_verified_at',
        'email_verification_token',
        'email_verified'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [
            'email'=>$this->email,
            'name'=>$this->name
        ];
    }

    public function emailverification(){
        $email = $this->email;
        $token = Str::random(40);
        $user = User::where('email',$email)->first();

        $user->update(['email_verification_token' => $token]);
        $link = env('Front_url').'email-verification?token='.$token;
        Maill::send([],[],function($message) use($email, $link){
            $message->to($email)
                    ->subject("Verify Your Email Address")
                    ->html("<p>Verify Your Email</p><br/><a href='".$link."'>Verify Email Address</a>");
        });
        return $link;
    }
}