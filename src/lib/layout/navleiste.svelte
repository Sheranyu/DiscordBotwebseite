<script>

</script>

<div class="seitenleiste">
    <div class="inhalt1">
        
    </div>
    <div class="seitenleiste-logout">
        <div class="logoutcontainer">
            <form action="./logout?/logout" method="post">
                <input  type="submit" value="logout"> 
            </form>
        </div>
    </div>
</div>


<style>

.seitenleiste {
        position:relative;
        z-index: 1;
        width: 70px;
        display: flex;
        flex-direction: column;
        background-color: #0400ff; /* Hintergrundfarbe hinzugefügt, damit die Seitenleiste sichtbar ist */
        color: #fff; /* Textfarbe für Sichtbarkeit hinzugefügt */
        height: 100svh;
        box-shadow: 0px 0px 5px 0px black ;
       
    }

    .seitenleiste-logout {
        margin-top: auto;
       
        
    }

    /* Optional: Stil für den Inhalt */
    .inhalt1 {
        padding: 10px;
    }

    /* Optional: Stil für den Logout-Container */
    .logoutcontainer {
        padding: 10px;
    }

    /* Optional: Stil für den Logout-Button */
    input[type="submit"] {
        background-color: rgba(17, 15, 110, 1);
        color: #fff;
        padding: 8px;
        border: none;
        cursor: pointer;
    }

    input[type="submit"]:hover {
        background-color: rgb(12, 10, 134, 1);
    }
    input[type="submit"]:active{
        background-color: rgb(16, 16, 45) 
    }

</style>