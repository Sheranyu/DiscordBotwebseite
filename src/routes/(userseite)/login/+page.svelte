
<script>
    import { enhance } from "$app/forms";



</script>



<div  class="logincontainer">
    <form use:enhance action="?/login" method="post">
        <div class="form-group">
            <label for="username">Einloggen</label>
            <input type="text" name="username" id="username" />
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" name="password" />
        </div>
        <input type="submit">
    </form>
</div>


<style>
.logincontainer{
    display: flex;
    justify-content: center;
    align-items: center;
    
}

.logincontainer > form{
    background: rgba(43, 43, 75, 0.526);
    padding: 10px;
    border-radius: 5px;
    color: white;
}

.form-group {
    display: flex;
    flex-direction: column;
    align-content: flex-end;
    margin-bottom: 10px;
    gap: 5px;/* Abstand zwischen den Formulargruppen */
}


</style>