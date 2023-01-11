import FadeLoader from "react-spinners/FadeLoader";


    function Loader() {
        
        return (
        <div data-testid="spinner_container">
            <FadeLoader
            color="#F0572D"
            margin={20}
            size={300}
            />
        </div>
        );
    }
    
export default Loader;