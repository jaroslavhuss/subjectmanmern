import { useDispatch } from "react-redux";
import { cleanError } from "../store/reducers/errorReducer"
const Error = ({ errorMessage }: { errorMessage: string }) => {
    const dispatch = useDispatch();
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            zIndex: 99999,
            width: "100%",
            height: "100%",
            background: "#e5e5e5d1"
        }}
            onClick={() => {
                dispatch(cleanError());
            }}
        >
            <p style={{ color: "red", padding: 40, background: "white", borderRadius: 12 }}>{errorMessage}</p>
        </div>
    );
};

export default Error;
