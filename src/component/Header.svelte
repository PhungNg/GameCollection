<script>

</script>
<ul>
    <li><a hreft="#">Home</a></li>
    <li><a hreft="#">Discover</a></li>
    <li><a hreft="#">News</a></li>
    <li><a hreft="#">Login</a></li>
    <li><a hreft="#">Sign in</a></li>
</ul>

<style>
    
    ul{
        display: grid;
        list-style-type: none;
        padding: 0;
        width: 75vw;
        column-gap: 15px;
        margin: auto;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    } 
    ul li{
        text-align: center;
        padding: 15px;
    }
    li a{
        color: aliceblue;
        text-decoration: none
    }

    li:hover{
        background-color: #222;
    }

</style>