import {createSlice } from "@reduxjs/toolkit"

const initialState ={

    mode:"light",
    user:null,
    token:null,
    posts:[],
    chatFriends:[],


        
}


export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setMode :(state)=>{
            state.mode = state.mode =='light' ?'dark' :"light";
        },
        setLogin:(state,action)=>{
            state.user = action.payload.user;
            state.token = action.payload.token;

        },
        setLogout:(state)=>{
            state.user = null,
            state.token = null

        },
        setFriends: (state,action)=>{
                if(state.user){
                    state.user.friends = action.payload.friends;
                }else{
                    console.error("user Freind not exists")
                }
        }
        ,
        setPosts : (state,action)=>{
            state.posts = action.payload.posts
        },
        setPost:(state,action)=>{
            const updatedPosts = state.posts.map((poste)=>{
                if(poste._id == action.payload.post._id) return action.payload.post;
                return poste;
            });
            state.posts =updatedPosts;
        },
        setChatFriends:(state,action)=>{
            state.chatFriends = action.payload.chatFriends;
        }
    }
})


export const {setMode,setLogin,setLogout, setFriends,setPost,setPosts,setChatFriends} = authSlice.actions;

export default authSlice.reducer;