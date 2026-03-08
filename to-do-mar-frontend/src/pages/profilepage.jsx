import { WrapperProfileKanan } from "../components/profile/wrapperProfileKanan";
import { WrapperProfileKiri } from "../components/profile/wrapperProfileKiri";
import "./profilepage.css"
export function ProfilePage(){
    return(
        <div className="profile-class">
            <WrapperProfileKiri/>
            <WrapperProfileKanan/>
        </div>
    )
}