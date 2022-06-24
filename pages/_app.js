import 'antd/dist/antd.css';
import '../styles/globals.css'
import Layout from "layouts/Layout/Layout";
import {Provider} from "react-redux";
import {store} from "@/store/store";
import {ModalState} from "context/modal/ModalState";
import {RequireUser} from "layouts/RequireUser/RequireUser";


function MyApp({Component, pageProps}) {
    return (
        <ModalState>
            <Provider store={store}>
                <Layout>
                    <RequireUser>
                        <Component {...pageProps} />
                    </RequireUser>
                </Layout>
            </Provider>
        </ModalState>
    )
}

export default MyApp
