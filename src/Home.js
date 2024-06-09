import { signInWithPopup } from 'firebase/auth'
import React from 'react'
import { provider, auth } from './firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

function Home () {
    const [user] = useAuthState(auth);

    //三項演算子でログインしているかどうかを判定
    return (
        <div>
            {user ? (
                <>
                    <UserInfo />
                    <SignOutButton />
                </>
            ) : (
                <SignInButton />
            )}
        </div>
    );
}

export default Home

//Googleでログインするボタンを作成
function SignInButton() {
    const signInWithGoogle = () => {
        //firebaseを使ってGoogleでログイン
        signInWithPopup(auth, provider);
    }

    return (
        <button onClick={signInWithGoogle}>Googleでサインイン</button>
    )
}

//サイン王と
function SignOutButton() {
    return (
        <button onClick={() => auth.signOut()}>サインアウト</button>
    )
}

//ユーザー情報を表示
function UserInfo() {
    return (
        <div>
            <img src={auth.currentUser.photoURL} alt="ユーザー画像" />
            <p>ユーザー名: {auth.currentUser.displayName}</p>
            <p>メールアドレス: {auth.currentUser.email}</p>
        </div>
    )
}