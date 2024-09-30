<!DOCTYPE html>
<html>
<head>
    <title>Password Reset</title>
</head>
<body>
    <h1>Reset Your Password</h1>
    <p>Click the link below to reset your password:</p>
    <a href="{{ url('reset-password/' . $token) }}">Reset Password</a>
    
</body>
</html>
