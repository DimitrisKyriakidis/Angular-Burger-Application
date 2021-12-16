export const USER = {
  1: {
    id: 1,
    email: 'user',
    password: '123'
  }

};

export const BURGERS: any = {
2: {
    id: 2,
    description: '',
   
    iconUrl: 'https://previews.123rf.com/images/mjutapix/mjutapix0612/mjutapix061200034/682773-simple-burger.jpg',
    lessonsCount: 10,
    category: 'SimpleBurger',
  
  },

  3: {
    id: 3,
    description: '',
   
    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cheeseburger.jpg/300px-Cheeseburger.jpg',
    category: 'CheeseBurger',
  
  },

  1: {
    id: 1,
    description: '',
   
    iconUrl: 'https://media.istockphoto.com/photos/hamburger-with-cheese-and-french-fries-picture-id1188412964?k=20&m=1188412964&s=612x612&w=0&h=Ow-uMeygg90_1sxoCz-vh60SQDssmjP06uGXcZ2MzPY=',
    lessonsCount: 10,
    category: 'DeluxeBurger',
   
  },
  

};

export function findBurgerById(burgerId: number) {
  return BURGERS[burgerId];
}

export function authenticate(email: string, password: string) {

  const user: any = Object.values(USER).find(user => user.email === email);

  if (user && user.password == password) {
    return user;
  } else {
    return undefined;
  }

}
