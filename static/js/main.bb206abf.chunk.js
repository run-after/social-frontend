(this["webpackJsonpsocial-frontend"]=this["webpackJsonpsocial-frontend"]||[]).push([[0],{28:function(e,t,n){},29:function(e,t,n){},30:function(e,t,n){},37:function(e,t,n){},39:function(e,t,n){},40:function(e,t,n){},41:function(e,t,n){},42:function(e,t,n){},43:function(e,t,n){},44:function(e,t,n){},45:function(e,t,n){},51:function(e,t,n){},52:function(e,t,n){},53:function(e,t,n){},54:function(e,t,n){"use strict";n.r(t);var c=n(2),a=n.n(c),s=n(14),o=n.n(s),r=(n(28),n(3)),i=(n(29),n(30),n.p+"static/media/s-icon.7c6357dc.png"),l=n(4),u=n(5),d=n(1);var h=function(e){var t=JSON.parse(localStorage.getItem("token"));return Object(d.jsxs)("header",{className:"header",children:[Object(d.jsxs)(l.b,{className:"logo",to:"/",children:[Object(d.jsx)("img",{className:"icon",src:i,alt:"social"}),Object(d.jsx)("p",{className:"logo-text",children:"social"})]}),Object(d.jsx)("nav",{className:"nav-bar",children:Object(d.jsxs)("ul",{className:"nav-bar-list",children:[Object(d.jsx)("li",{className:"nav-bar-list-item",children:e.loggedIn&&Object(d.jsx)(l.b,{to:"/",children:Object(d.jsx)(u.f,{})})}),Object(d.jsx)("li",{className:"nav-bar-list-item",children:e.loggedIn&&Object(d.jsx)(l.b,{to:"/users/".concat(t.user._id),children:Object(d.jsx)(u.d,{})})}),Object(d.jsx)("li",{className:"nav-bar-list-item",children:e.loggedIn&&Object(d.jsx)(l.b,{to:"/users",children:Object(d.jsx)(u.c,{})})})]})}),Object(d.jsxs)("div",{className:"action-buttons",children:[e.loggedIn&&Object(d.jsx)("button",{className:"action-button btn",onClick:e.logOut,children:"Log out"}),!e.loggedIn&&Object(d.jsx)(l.b,{className:"action-button btn",to:"/signup",children:"Sign up"}),!e.loggedIn&&Object(d.jsx)(l.b,{className:"action-button btn",to:"login",children:"Log in"})]})]})},j=(n(37),n(11)),m=n.n(j),b=n(6),p=n(23),f=n.n(p);var O=function(e){var t=Object(b.g)(),n=function(){t.push("/")},a=Object(c.useState)(null),s=Object(r.a)(a,2),o=s[0],i=s[1],l=function(t){var n={token:t.token,user:t.user,expires:m()().add(1,"days")};localStorage.setItem("token",JSON.stringify(n)),e.setLoggedIn(!0)};return Object(d.jsxs)("div",{className:"login",children:[Object(d.jsxs)("form",{className:"login-form",onSubmit:function(e){e.preventDefault(),fetch("".concat("https://invulnerable-livre-74114.herokuapp.com","/login"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:e.target.username.value,password:e.target.password.value})}).then((function(e){e.json().then((function(e){e.user?(l(e),i(null),n()):i(e.message)}))}))},children:[Object(d.jsx)("p",{className:"error-message",children:o}),Object(d.jsx)("h5",{children:"Log in"}),Object(d.jsx)("input",{id:"username",type:"email",placeholder:"email",required:!0}),Object(d.jsx)("input",{id:"password",type:"password",placeholder:"password",required:!0}),Object(d.jsx)("button",{className:"btn",type:"submit",children:"Log in"})]}),Object(d.jsx)("div",{className:"spacer",children:"OR"}),Object(d.jsx)(f.a,{appId:"343361590828520",autoLoad:!0,callback:function(e){fetch("".concat("https://invulnerable-livre-74114.herokuapp.com","/login/facebook"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then((function(e){e.json().then((function(e){l(e),n()}))}))},render:function(e){return Object(d.jsx)("button",{className:"facebook-btn btn",onClick:e.onClick,children:"Log in with Facebook"})}})]})};n(39);var x=function(e){var t=Object(b.g)(),n=Object(c.useState)(null),a=Object(r.a)(n,2),s=a[0],o=a[1];return Object(d.jsx)("div",{className:"signup",children:Object(d.jsxs)("form",{className:"signup-form",onSubmit:function(n){n.preventDefault(),fetch("".concat("https://invulnerable-livre-74114.herokuapp.com","/users"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:n.target.email.value,password:n.target.password.value,confirmation:n.target.confirmation.value,firstName:n.target.firstName.value,lastName:n.target.lastName.value})}).then((function(n){n.json().then((function(n){n.user?(!function(t){var n={token:t.token,user:t.user,expires:m()().add(1,"days")};localStorage.setItem("token",JSON.stringify(n)),e.setLoggedIn(!0)}(n),o(null),t.push("/")):o(n.message)}))}))},children:[s&&s.map((function(e){return Object(d.jsx)("p",{className:"error-message",children:e},e)})),Object(d.jsx)("h5",{children:"Sign up"}),Object(d.jsx)("input",{id:"firstName",placeholder:"First Name"}),Object(d.jsx)("input",{id:"lastName",placeholder:"Last Name"}),Object(d.jsx)("input",{id:"email",type:"email",placeholder:"Email",required:!0}),Object(d.jsx)("input",{id:"password",type:"password",placeholder:"Password",required:!0}),Object(d.jsx)("input",{id:"confirmation",type:"password",placeholder:"Re-enter password",required:!0}),Object(d.jsx)("button",{type:"submit",children:"Sign up"})]})})};n(40);var v=function(e){var t=JSON.parse(localStorage.getItem("token")),n=Object(c.useState)(null),a=Object(r.a)(n,2),s=a[0],o=a[1],i=Object(c.useState)({data:[]}),u=Object(r.a)(i,2),h=u[0],j=u[1],m=Object(c.useState)({data:[]}),b=Object(r.a)(m,2),p=b[0],f=b[1],O=Object(c.useState)({data:t.user.friends}),x=Object(r.a)(O,2),v=x[0],k=x[1];return Object(c.useEffect)((function(){if(!e.checkIfTokenIsExpired()){var n=!0;return fetch("".concat("https://invulnerable-livre-74114.herokuapp.com","/users"),{headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(t.token)}}).then((function(e){e.json().then((function(e){n&&o(e)}))})),fetch("".concat("https://invulnerable-livre-74114.herokuapp.com","/friendRequests"),{headers:{Authorization:"Bearer ".concat(t.token)}}).then((function(e){e.json().then((function(e){var c=[],a=[];e.forEach((function(e){e.requester===t.user._id?a.push(e.requested):e.requested===t.user._id&&c.push(e.requester)})),n&&(f({data:a}),j({data:c}))}))})),function(){n=!1}}}),[t.user._id,t.token]),Object(d.jsx)("div",{className:"users-page",children:s&&s.map((function(n){if(n._id!==t.user._id)return Object(d.jsxs)("div",{className:"user",children:[Object(d.jsx)(l.b,{className:"user-image-backdrop",to:"/users/".concat(n._id),children:Object(d.jsx)("img",{className:"user-image",src:n.avatar,alt:"".concat(n.firstName,"'s avatar")})}),Object(d.jsx)("h5",{className:"user-name",children:Object(d.jsx)(l.b,{to:"/users/".concat(n._id),children:"".concat(n.firstName," ").concat(n.lastName)})}),v.data.includes(n._id)&&Object(d.jsx)("button",{className:"remove-friend-button btn",onClick:function(){return function(n){if(!e.checkIfTokenIsExpired()){var c=JSON.parse(localStorage.getItem("token")).user,a=n.friends.filter((function(e){return e!==c._id}));n.friends=a,fetch("".concat("https://invulnerable-livre-74114.herokuapp.com","/users/").concat(n._id),{method:"PUT",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(t.token)},body:JSON.stringify(n)}),a=c.friends.filter((function(e){return e!==n._id})),c.friends=a,fetch("".concat("https://invulnerable-livre-74114.herokuapp.com","/users/").concat(c._id),{method:"PUT",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(t.token)},body:JSON.stringify(c)}).then((function(e){e.json().then((function(e){var t=JSON.parse(localStorage.getItem("token"));t.user=e,localStorage.setItem("token",JSON.stringify(t)),k({data:a})}))}))}}(n)},children:"Remove friend"})||p.data.includes(n._id)&&Object(d.jsx)("div",{className:"requested-block",children:"Friend requested"})||h.data.includes(n._id)&&Object(d.jsx)("button",{className:"friend-requested btn",onClick:function(){return function(n){if(!e.checkIfTokenIsExpired()){j({data:h.data.filter((function(e){return e!==n._id}))});var c=JSON.parse(localStorage.getItem("token")).user;n.friends.push(c._id),fetch("".concat("https://invulnerable-livre-74114.herokuapp.com","/users/").concat(n._id),{method:"PUT",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(t.token)},body:JSON.stringify(n)}),c.friends.push(n._id),k({data:c.friends}),fetch("".concat("https://invulnerable-livre-74114.herokuapp.com","/users/").concat(c._id),{method:"PUT",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(t.token)},body:JSON.stringify(c)}).then((function(e){e.json().then((function(e){var t=JSON.parse(localStorage.getItem("token"));t.user=e,localStorage.setItem("token",JSON.stringify(t))}))})),fetch("".concat("https://invulnerable-livre-74114.herokuapp.com","/friendRequests"),{method:"GET",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(t.token)}}).then((function(e){e.json().then((function(e){e.forEach((function(e){e.requested===c._id&&e.requester===n._id&&fetch("".concat("https://invulnerable-livre-74114.herokuapp.com","/friendRequests/").concat(e._id),{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(t.token)}})}))}))}))}}(n)},children:"Accept request"})||Object(d.jsx)("button",{className:"add-friend-button btn",onClick:function(){return c=n,void(e.checkIfTokenIsExpired()||fetch("".concat("https://invulnerable-livre-74114.herokuapp.com","/friendRequests/").concat(c._id),{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(t.token)}}).then((function(e){e.json().then((function(){var e=p.data;e.push(c._id),f({data:e})}))})));var c},children:"Add friend"})]},n._id)}))})},k=(n(41),n(42),n(15));n(43),n(44);var g=function(e){var t=JSON.parse(localStorage.getItem("token"));return Object(d.jsx)("div",{className:"edit-modal",children:Object(d.jsxs)("div",{className:"edit-form",children:[Object(d.jsxs)("header",{className:"edit-form-header",children:[Object(d.jsx)("button",{className:"close-modal-button",onClick:e.closeModal,children:Object(d.jsx)(u.i,{})}),"Edit ",e.type]}),Object(d.jsx)("div",{className:"edit-form-content",children:Object(d.jsxs)("form",{onSubmit:function(n){n.preventDefault(),e.checkIfTokenIsExpired()||("post"===e.type?fetch("".concat("https://invulnerable-livre-74114.herokuapp.com","/posts/").concat(e.content._id),{method:"PUT",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(t.token)},body:JSON.stringify({content:n.target.content.value})}).then((function(t){t.json().then((function(t){e.closeModal(),e.setPost(t)}))})):fetch("".concat("https://invulnerable-livre-74114.herokuapp.com","/posts/").concat(e.content.post,"/comments/").concat(e.content._id),{method:"PUT",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(t.token)},body:JSON.stringify({content:n.target.content.value})}).then((function(t){t.json().then((function(t){e.closeModal(),e.setComment(t)}))})))},className:"edit-form-form",children:[Object(d.jsx)("input",{name:"content",id:"content",defaultValue:e.content.content}),Object(d.jsx)("button",{type:"submit",className:"btn",children:"Save"})]})})]})})};var N=function(e){var t=JSON.parse(localStorage.getItem("token")),n=Object(c.useState)({data:[]}),a=Object(r.a)(n,2),s=a[0],o=a[1],i=Object(c.useState)(!1),l=Object(r.a)(i,2),h=l[0],j=l[1],m=Object(c.useState)(!1),b=Object(r.a)(m,2),p=b[0],f=b[1],O=Object(c.useState)(e.comment),x=Object(r.a)(O,2),v=x[0],N=x[1],I=function(){e.checkIfTokenIsExpired()||f(!p)};return Object(c.useEffect)((function(){e.checkIfTokenIsExpired()||fetch("".concat("https://invulnerable-livre-74114.herokuapp.com","/posts/").concat(e.comment.post,"/comments/").concat(e.comment._id,"/likes"),{headers:{Authorization:"Bearer ".concat(t.token)}}).then((function(e){e.json().then((function(e){e.message||(o({data:e}),e.forEach((function(e){e.user===t.user._id?j(!0):j(!1)})))}))}))}),[e.comment.post,e.comment._id,t.token,t.user._id]),Object(d.jsxs)("div",{className:"comment",children:[p&&Object(d.jsx)(g,{type:"comment",closeModal:I,content:v,setComment:N,checkIfTokenIsExpired:e.checkIfTokenIsExpired}),Object(d.jsx)("img",{className:"comment-avatar",src:e.comment.author.avatar,alt:"".concat(e.comment.author.firstName,"'s avatar")}),Object(d.jsxs)("div",{className:"comment-content",children:[Object(d.jsx)("h6",{className:"comment-author",children:"".concat(e.comment.author.firstName," ").concat(e.comment.author.lastName)}),Object(d.jsxs)("div",{className:"comment-button-container",children:[e.comment.author._id===t.user._id&&Object(d.jsx)("button",{className:"edit-comment-button",onClick:I,children:Object(d.jsx)(u.g,{})}),e.comment.author._id===t.user._id&&Object(d.jsx)("button",{className:"delete-comment-button",onClick:function(){e.checkIfTokenIsExpired()||window.confirm("Are you sure you want to delete this comment?")&&fetch("".concat("https://invulnerable-livre-74114.herokuapp.com","/posts/").concat(v.post,"/comments/").concat(v._id),{method:"DELETE",headers:{Authorization:"Bearer ".concat(t.token)}}).then((function(t){t.json().then((function(t){var n=e.postComments.data.filter((function(t){return t._id!==e.comment._id}));e.setPostComments({data:n})}))}))},children:Object(d.jsx)(u.h,{})})]}),v.content,Object(d.jsx)("button",{className:"comment-like-button",onClick:function(){var n;n=e.comment._id,e.checkIfTokenIsExpired()||(h?fetch("".concat("https://invulnerable-livre-74114.herokuapp.com","/posts/").concat(e.comment.post,"/comments/").concat(n,"/likes"),{method:"DELETE",headers:{Authorization:"Bearer ".concat(t.token)}}).then((function(e){e.json().then((function(e){j(!1);var c=s.data.filter((function(e){return e.comment!==n&&e.user!==t.user._id}));o({data:c})}))})):fetch("".concat("https://invulnerable-livre-74114.herokuapp.com","/posts/").concat(e.comment.post,"/comments/").concat(n,"/likes"),{method:"POST",headers:{Authorization:"Bearer ".concat(t.token)}}).then((function(e){e.json().then((function(e){j(!0);var t=s.data;t.push(e),o({data:t})}))})))},children:h?"Unlike":"Like"}),Object(d.jsxs)("span",{className:"like-count",children:[Object(d.jsx)(k.a,{}),s.data.length]})]})]})};var I=function(e){var t=JSON.parse(localStorage.getItem("token")),n=Object(c.useState)({data:[]}),a=Object(r.a)(n,2),s=a[0],o=a[1],i=Object(c.useState)(null),h=Object(r.a)(i,2),j=h[0],m=h[1],b=Object(c.useState)(!1),p=Object(r.a)(b,2),f=p[0],O=p[1],x=Object(c.useState)(""),v=Object(r.a)(x,2),I=v[0],S=v[1],T=Object(c.useState)(!1),y=Object(r.a)(T,2),_=y[0],E=y[1],C=Object(c.useState)({data:[]}),A=Object(r.a)(C,2),J=A[0],P=A[1],w=Object(c.useState)(!1),z=Object(r.a)(w,2),B=z[0],D=z[1],q=Object(c.useState)(e.post),L=Object(r.a)(q,2),U=L[0],M=L[1],F=function(){e.checkIfTokenIsExpired()||D(!B)};return Object(c.useEffect)((function(){e.checkIfTokenIsExpired()||(fetch("".concat("https://invulnerable-livre-74114.herokuapp.com","/posts/").concat(e.post._id,"/comments"),{headers:{Authorization:"Bearer ".concat(t.token)}}).then((function(e){e.json().then((function(e){o({data:e})}))})),fetch("".concat("https://invulnerable-livre-74114.herokuapp.com","/posts/").concat(e.post._id,"/likes"),{headers:{Authorization:"Bearer ".concat(t.token)}}).then((function(e){e.json().then((function(e){e.message||(P({data:e}),e.forEach((function(e){e.user===t.user._id?E(!0):E(!1)})))}))})))}),[t.token,e.post._id,t.user._id]),Object(d.jsxs)("div",{className:"post",children:[B&&Object(d.jsx)(g,{type:"post",closeModal:F,content:U,setPost:M,checkIfTokenIsExpired:e.checkIfTokenIsExpired}),Object(d.jsxs)("div",{className:"post-header",children:[Object(d.jsxs)(l.b,{className:"post-author",to:"/users/".concat(e.post.author._id),children:[Object(d.jsx)("img",{className:"post-avatar",src:e.post.author.avatar,alt:"".concat(e.post.author.firstName,"'s avatar")}),e.post.author.firstName," ",e.post.author.lastName]}),Object(d.jsx)("span",{className:"post-time",children:new Date(e.post.createdAt).toLocaleString()}),e.post.author._id===t.user._id&&Object(d.jsx)("button",{onClick:function(){return n=e.post._id,void(e.checkIfTokenIsExpired()||window.confirm("Are you sure you want to delete this post?")&&fetch("".concat("https://invulnerable-livre-74114.herokuapp.com","/posts/").concat(n),{method:"DELETE",headers:{Authorization:"Bearer ".concat(t.token)}}).then((function(t){t.json().then((function(t){var n=e.posts.data.filter((function(t){return t._id!==e.post._id}));e.setPosts({data:n})}))})));var n},className:"delete-button",children:Object(d.jsx)(u.e,{})}),e.post.author._id===t.user._id&&Object(d.jsx)("button",{onClick:function(){return F(e.post._id)},className:"edit-button",children:Object(d.jsx)(u.g,{})})]}),Object(d.jsx)("div",{className:"post-content",children:U.isPicture&&Object(d.jsx)("img",{src:U.content,alt:U.content,className:"post-image"})||U.content}),Object(d.jsxs)("div",{className:"action-buttons",children:[Object(d.jsxs)("button",{className:"action-button",onClick:function(){var n;n=e.post._id,e.checkIfTokenIsExpired()||(_?fetch("".concat("https://invulnerable-livre-74114.herokuapp.com","/posts/").concat(n,"/likes"),{method:"DELETE",headers:{Authorization:"Bearer ".concat(t.token)}}).then((function(e){e.json().then((function(e){E(!1);var c=J.data.filter((function(e){return e.post!==n&&e.user!==t.user._id}));P({data:c})}))})):fetch("".concat("https://invulnerable-livre-74114.herokuapp.com","/posts/").concat(n,"/likes"),{method:"POST",headers:{Authorization:"Bearer ".concat(t.token)}}).then((function(e){e.json().then((function(e){E(!0);var t=J.data;t.push(e),P({data:t})}))})))},children:[Object(d.jsx)(k.a,{}),_?"Unlike":"Like"]}),Object(d.jsxs)("button",{className:"action-button",onClick:function(){O(!f)},children:[Object(d.jsx)(u.a,{}),"Comment"]})]}),Object(d.jsxs)("span",{className:"like-count",children:[Object(d.jsx)(k.a,{})," ",J.data.length]}),f&&Object(d.jsxs)("div",{className:"comments",children:[Object(d.jsxs)("form",{className:"comment-form",onSubmit:function(n){n.preventDefault(),e.checkIfTokenIsExpired()||fetch("".concat("https://invulnerable-livre-74114.herokuapp.com","/posts/").concat(e.post._id,"/comments"),{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(t.token)},body:JSON.stringify({content:I,author:t.user})}).then((function(e){e.json().then((function(e){if(e.message)m(e.message);else{var n=s.data;e.author=t.user,n.unshift(e),o({data:n}),S("")}}))}))},children:[Object(d.jsx)("img",{className:"comment-avatar",src:t.user.avatar,alt:"".concat(t.user.firstName,"'s avatar")}),Object(d.jsxs)("div",{className:"text-area-container ".concat(j&&"highlight-error"),children:[Object(d.jsx)("div",{className:"error-message",children:j}),Object(d.jsx)("textarea",{id:"content",name:"content",onChange:function(e){S(e.target.value)},value:I,placeholder:"Write comment...",required:!0})]}),Object(d.jsx)("button",{className:"create-comment-button btn",children:"Submit"})]}),s.data.map((function(t){return Object(d.jsx)(N,{comment:t,postComments:s,setPostComments:o,checkIfTokenIsExpired:e.checkIfTokenIsExpired},t._id)}))]})]})},S=(n(45),n(17)),T=n.n(S);var y=function(e){var t=JSON.parse(localStorage.getItem("token")),n=Object(c.useState)(null),a=Object(r.a)(n,2),s=a[0],o=a[1];return Object(d.jsx)("div",{className:"edit-user-modal",children:Object(d.jsxs)("div",{className:"edit-form",children:[Object(d.jsxs)("header",{className:"edit-form-header",children:[Object(d.jsx)("button",{className:"close-modal-button",onClick:e.closeModal,children:Object(d.jsx)(u.i,{})}),"Edit profile"]}),Object(d.jsx)("div",{className:"edit-form-content",children:Object(d.jsxs)("form",{onSubmit:function(n){if(n.preventDefault(),!e.checkIfTokenIsExpired()){if(s){var c=new FormData;c.append("name",(new Date).toString()),c.append("image",s),fetch("".concat("https://invulnerable-livre-74114.herokuapp.com","/imageUpload/").concat(e.user._id,"/avatar-upload"),{method:"POST",headers:{Authorization:"Bearer ".concat(t.token)},body:c}).then((function(c){c.json().then((function(c){var a={};Object.assign(a,e.user),a.firstname=n.target.firstName.value,a.lastName=n.target.lastName.value,a.avatar=c,fetch("".concat("https://invulnerable-livre-74114.herokuapp.com","/users/").concat(e.user._id),{method:"PUT",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(t.token)},body:JSON.stringify(a)}),t.user=a,e.setUser(a),localStorage.setItem("token",JSON.stringify(t))}))}))}else{var a={};Object.assign(a,e.user),a.firstName=n.target.firstName.value,a.lastName=n.target.lastName.value,fetch("".concat("https://invulnerable-livre-74114.herokuapp.com","/users/").concat(e.user._id),{method:"PUT",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(t.token)},body:JSON.stringify(a)}),t.user=a,e.setUser(a),localStorage.setItem("token",JSON.stringify(t))}e.closeModal()}},className:"edit-form-form",children:[Object(d.jsx)(T.a,{withIcon:!0,buttonText:"Choose Image",onChange:function(e){o(e[0])},imgExtension:[".jpeg",".jpg",".gif",".png"],maxFileSize:5242880,singleImage:!0,withPreview:!0}),Object(d.jsx)("input",{name:"firstName",id:"firstName",defaultValue:e.user.firstName}),Object(d.jsx)("input",{name:"lastName",id:"lastName",defaultValue:e.user.lastName}),Object(d.jsx)("button",{type:"submit",className:"btn",children:"Save"})]})})]})})};n(51);var _=function(e){var t=JSON.parse(localStorage.getItem("token")),n=Object(c.useState)(null),a=Object(r.a)(n,2),s=a[0],o=a[1];return Object(d.jsxs)("div",{className:"image-upload-modal",children:[Object(d.jsxs)("form",{onSubmit:function(n){if(n.preventDefault(),!e.checkIfTokenIsExpired()&&s){var c=new FormData;c.append("name",(new Date).toString()),c.append("image",s),fetch("".concat("https://invulnerable-livre-74114.herokuapp.com","/imageUpload"),{method:"POST",headers:{Authorization:"Bearer ".concat(t.token)},body:c}).then((function(n){n.json().then((function(n){fetch("".concat("https://invulnerable-livre-74114.herokuapp.com","/posts"),{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(t.token)},body:JSON.stringify({isPicture:!0,author:t.user._id,content:n})}).then((function(n){n.json().then((function(n){var c=e.userPosts.data;n.author=t.user,c.unshift(n),e.setUserPosts({data:c})}))}))}))}))}e.closeModal()},children:[Object(d.jsx)(T.a,{withIcon:!0,buttonText:"Choose Image",onChange:function(e){o(e[0])},imgExtension:[".jpeg",".jpg",".gif",".png"],maxFileSize:5242880,singleImage:!0,withPreview:!0}),Object(d.jsx)("button",{className:"upload-image-btn btn",type:"submit",children:"Create Post"})]}),Object(d.jsx)("button",{className:"close-modal-button",onClick:e.closeModal,children:Object(d.jsx)(u.i,{})})]})};var E=function(e){var t=JSON.parse(localStorage.getItem("token")),n=Object(b.h)().userID,a=Object(c.useState)(null),s=Object(r.a)(a,2),o=s[0],i=s[1],h=Object(c.useState)({data:[]}),j=Object(r.a)(h,2),m=j[0],p=j[1],f=Object(c.useState)(""),O=Object(r.a)(f,2),x=O[0],v=O[1],k=Object(c.useState)(null),g=Object(r.a)(k,2),N=g[0],S=g[1],T=Object(c.useState)(null),E=Object(r.a)(T,2),C=E[0],A=E[1],J=Object(c.useState)(!1),P=Object(r.a)(J,2),w=P[0],z=P[1],B=Object(c.useState)(!1),D=Object(r.a)(B,2),q=D[0],L=D[1],U=function(){e.checkIfTokenIsExpired()||z(!w)},M=function(){L(!q)};return Object(c.useEffect)((function(){e.checkIfTokenIsExpired()||(fetch("".concat("https://invulnerable-livre-74114.herokuapp.com","/users/").concat(n),{headers:{Authorization:"Bearer ".concat(t.token)}}).then((function(e){e.json().then((function(e){fetch("".concat("https://invulnerable-livre-74114.herokuapp.com","/users"),{headers:{Authorization:"Bearer ".concat(t.token)}}).then((function(t){t.json().then((function(t){var n=t.filter((function(t){return e.friends.includes(t._id)}));S(n)}))})),i(e)}))})),fetch("".concat("https://invulnerable-livre-74114.herokuapp.com","/users/").concat(n,"/posts"),{headers:{Authorization:"Bearer ".concat(t.token)}}).then((function(e){e.json().then((function(e){p({data:e})}))})))}),[t.token,n]),Object(d.jsxs)("div",{className:"profile-page",children:[Object(d.jsxs)("section",{className:"hero-section",children:[w&&Object(d.jsx)(y,{closeModal:U,user:o,setUser:i,checkIfTokenIsExpired:e.checkIfTokenIsExpired}),q&&Object(d.jsx)(_,{closeModal:M,userPosts:m,setUserPosts:p,checkIfTokenIsExpired:e.checkIfTokenIsExpired}),Object(d.jsxs)("div",{className:"user-image-backdrop",children:[o&&Object(d.jsx)("img",{className:"user-avatar",src:o.avatar,alt:"".concat(o.firstName,"'s avatar")}),o&&o._id===t.user._id&&Object(d.jsx)("button",{onClick:U,className:"edit-user-btn",children:Object(d.jsx)(u.g,{})})]}),o&&Object(d.jsxs)("h4",{className:"user-name",children:[o.firstName," ",o.lastName]}),o&&Object(d.jsxs)("p",{children:["Member since: ",new Date(o.createdAt).toLocaleDateString()]}),o&&o._id===t.user._id&&Object(d.jsx)("button",{className:"btn",onClick:function(){e.checkIfTokenIsExpired()||window.confirm("Are you sure you want to delete this account?")&&fetch("".concat("https://invulnerable-livre-74114.herokuapp.com","/users/").concat(t.user._id),{method:"DELETE",headers:{Authorization:"Bearer ".concat(t.token)}}).then((function(){e.logOut()}))},children:"Delete account"})]}),Object(d.jsxs)("main",{className:"main-section",children:[o&&o._id===t.user._id&&Object(d.jsxs)("div",{className:"post-form-container",children:[Object(d.jsxs)("form",{className:"post-form",onSubmit:function(c){c.preventDefault(),e.checkIfTokenIsExpired()||fetch("".concat("https://invulnerable-livre-74114.herokuapp.com","/posts"),{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(t.token)},body:JSON.stringify({content:c.target.content.value,author:n})}).then((function(e){e.json().then((function(e){if(e.message)A(e.message);else{var t=m.data;e.author=o,t.unshift(e),p({data:t}),v(""),A(null)}}))}))},children:[Object(d.jsxs)("div",{className:"text-area-container ".concat(C&&"highlight-error"),children:[Object(d.jsx)("div",{className:"error-message",children:C}),Object(d.jsx)("textarea",{id:"content",name:"content",onChange:function(e){v(e.target.value)},value:x,placeholder:"What is on your mind?",required:!0})]}),Object(d.jsx)("button",{className:"btn",type:"submit",children:"Post"})]}),Object(d.jsx)("button",{className:"btn",onClick:M,children:Object(d.jsx)(u.b,{})})]}),Object(d.jsxs)("div",{className:"user-feed",children:[Object(d.jsxs)("section",{className:"left-section",children:[Object(d.jsx)("h5",{className:"title",children:"Friends"}),Object(d.jsx)("p",{className:"friend-count",children:"".concat(N&&N.length," friends")}),Object(d.jsx)("div",{className:"friend-tiles",children:N&&N.map((function(e){return Object(d.jsxs)(l.b,{className:"friend",to:"/users/".concat(e._id),children:[Object(d.jsx)("img",{className:"friend-avatar",src:e.avatar,alt:"".concat(e.firstName,"'s avatar")}),Object(d.jsx)("p",{className:"friend-name",children:"".concat(e.firstName," ").concat(e.lastName)})]},e._id)}))})]}),Object(d.jsx)("div",{className:"post-feed",children:m&&m.data.map((function(t){return Object(d.jsx)(I,{posts:m,setPosts:p,post:t,checkIfTokenIsExpired:e.checkIfTokenIsExpired},t._id)}))})]})]})]})};n(52);var C=function(e){var t=JSON.parse(localStorage.getItem("token")),n=Object(c.useState)(null),a=Object(r.a)(n,2),s=a[0],o=a[1];return Object(c.useEffect)((function(){if(!e.checkIfTokenIsExpired()){var n=!0;return fetch("".concat("https://invulnerable-livre-74114.herokuapp.com","/users"),{headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(t.token)}}).then((function(e){e.json().then((function(e){if(n){var c=e.filter((function(e){return t.user.friends.includes(e._id)}));o(c)}}))})),function(){n=!1}}}),[t.user._id,t.token]),Object(d.jsx)("div",{className:"friends-page",children:s&&s.map((function(n){if(n._id!==t.user._id)return Object(d.jsxs)("div",{className:"user",children:[Object(d.jsx)(l.b,{className:"user-image-backdrop",to:"/users/".concat(n._id),children:Object(d.jsx)("img",{className:"user-image",src:n.avatar,alt:"".concat(n.firstName,"'s avatar")})}),Object(d.jsx)("h5",{className:"user-name",children:Object(d.jsx)(l.b,{to:"/users/".concat(n._id),children:"".concat(n.firstName," ").concat(n.lastName)})}),Object(d.jsx)("button",{className:"remove-friend-button btn",onClick:function(){return function(n){if(!e.checkIfTokenIsExpired()){var c=JSON.parse(localStorage.getItem("token")).user,a=n.friends.filter((function(e){return e!==c._id}));n.friends=a,fetch("".concat("https://invulnerable-livre-74114.herokuapp.com","/users/").concat(n._id),{method:"PUT",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(t.token)},body:JSON.stringify(n)}),a=c.friends.filter((function(e){return e!==n._id})),c.friends=a,fetch("".concat("https://invulnerable-livre-74114.herokuapp.com","/users/").concat(c._id),{method:"PUT",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(t.token)},body:JSON.stringify(c)}).then((function(e){e.json().then((function(e){var t=JSON.parse(localStorage.getItem("token"));t.user=e,localStorage.setItem("token",JSON.stringify(t)),o(a)}))}))}}(n)},children:"Remove friend"})]},n._id)}))})};n(53);var A=function(e){var t=JSON.parse(localStorage.getItem("token")),n=Object(c.useState)({data:[]}),a=Object(r.a)(n,2),s=a[0],o=a[1],i=Object(c.useState)(""),h=Object(r.a)(i,2),j=h[0],m=h[1],b=Object(c.useState)(null),p=Object(r.a)(b,2),f=p[0],O=p[1],x=Object(c.useState)(!1),v=Object(r.a)(x,2),k=v[0],g=v[1],N=function(){g(!k)};return Object(c.useEffect)((function(){e.checkIfTokenIsExpired()||fetch("".concat("https://invulnerable-livre-74114.herokuapp.com","/posts"),{headers:{Authorization:"Bearer ".concat(t.token)}}).then((function(e){e.json().then((function(e){var n=e.filter((function(e){return t.user.friends.includes(e.author._id)||e.author._id===t.user._id}));o({data:n})}))}))}),[t.token,t.user._id]),Object(d.jsxs)("div",{className:"home",children:[Object(d.jsxs)("div",{className:"left-column",children:[Object(d.jsxs)(l.b,{className:"current-user",to:"/users/".concat(t.user._id),children:[Object(d.jsx)("img",{className:"left-column-image",src:t.user.avatar,alt:"".concat(t.user.firstName,"'s avatar")}),t.user.firstName," ",t.user.lastName]}),Object(d.jsxs)(l.b,{className:"friends",to:"/friends",children:[Object(d.jsx)("div",{className:"left-column-image",children:Object(d.jsx)(u.c,{})}),"Friends"]})]}),Object(d.jsxs)("div",{className:"post-feed",children:[k&&Object(d.jsx)(_,{closeModal:N,userPosts:s,setUserPosts:o,checkIfTokenIsExpired:e.checkIfTokenIsExpired}),Object(d.jsxs)("div",{className:"post-form-container",children:[Object(d.jsxs)("form",{className:"post-form",onSubmit:function(n){n.preventDefault(),e.checkIfTokenIsExpired()||fetch("".concat("https://invulnerable-livre-74114.herokuapp.com","/posts"),{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(t.token)},body:JSON.stringify({content:n.target.content.value,author:t.user._id})}).then((function(e){e.json().then((function(e){if(e.message)O(e.message);else{var n=s.data;e.author=t.user,n.unshift(e),o({data:n}),m(""),O(null)}}))}))},children:[Object(d.jsxs)("div",{className:"text-area-container ".concat(f&&"highlight-error"),children:[Object(d.jsx)("div",{className:"error-message",children:f}),Object(d.jsx)("textarea",{id:"content",name:"content",onChange:function(e){m(e.target.value)},value:j,placeholder:"What is on your mind?",required:!0})]}),Object(d.jsx)("button",{className:"btn",type:"submit",children:"Post"})]}),Object(d.jsx)("button",{className:"btn",onClick:N,children:Object(d.jsx)(u.b,{})})]}),s&&s.data.map((function(t){return Object(d.jsx)(I,{posts:s,setPosts:o,post:t,checkIfTokenIsExpired:e.checkIfTokenIsExpired},t._id)}))]})]})};var J=function(){var e=Object(c.useState)(!!localStorage.getItem("token")),t=Object(r.a)(e,2),n=t[0],a=t[1],s=function(){localStorage.removeItem("token"),window.location.reload()},o=function(){var e=JSON.parse(localStorage.getItem("token"));return m()(e.expires)<m()()&&(s(),!0)};return Object(c.useEffect)((function(){if(localStorage.getItem("token")){var e=JSON.parse(localStorage.getItem("token"));m()(e.expires)<m()()?(localStorage.removeItem("token"),a(!1)):a(!0)}else a(!1)}),[]),Object(d.jsx)(l.a,{children:Object(d.jsxs)("div",{className:"App",children:[Object(d.jsx)(h,{loggedIn:n,setLoggedIn:a,logOut:s}),Object(d.jsxs)(b.d,{children:[Object(d.jsx)(b.b,{path:"/login",children:Object(d.jsx)(O,{setLoggedIn:a})}),Object(d.jsx)(b.b,{path:"/signup",children:Object(d.jsx)(x,{setLoggedIn:a})}),Object(d.jsx)(b.b,{path:"/users/:userID",children:!n&&Object(d.jsx)(b.a,{to:"/login"})||Object(d.jsx)(E,{checkIfTokenIsExpired:o,logOut:s})}),Object(d.jsx)(b.b,{path:"/users",children:!n&&Object(d.jsx)(b.a,{to:"/login"})||Object(d.jsx)(v,{checkIfTokenIsExpired:o})}),Object(d.jsx)(b.b,{path:"/friends",children:!n&&Object(d.jsx)(b.a,{to:"/login"})||Object(d.jsx)(C,{checkIfTokenIsExpired:o})}),Object(d.jsx)(b.b,{path:"/",children:!n&&Object(d.jsx)(b.a,{to:"/login"})||Object(d.jsx)(A,{checkIfTokenIsExpired:o})})]})]})})};o.a.render(Object(d.jsx)(a.a.StrictMode,{children:Object(d.jsx)(J,{})}),document.getElementById("root"))}},[[54,1,2]]]);
//# sourceMappingURL=main.bb206abf.chunk.js.map