export default function({ route, store, req, res, redirect, $axios }) {
  if(!store.state.userInfo.name){
    return redirect('/log')
  }
}
