import '../styles/Card.css'
function Header() {
    return (
        <>
            <div className="container header m-auto bg-video">
                <video muted loop autoPlay id='videoSource bg-video' height={"200px"}>
                    <source src='../../public/pokemonBG.mp4' type='video/mp4' />
                </video>
                <h1 id="title">Pokemon Card Game</h1>
            </div>
        </>
    )
}

export default Header;