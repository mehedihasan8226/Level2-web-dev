
# 1. Answer:
TypeScript এ interface এবং type (Type Alias) দুটোই মূলত অবজেক্টের গঠন বা স্ট্রাকচার ডিফাইন করতে ব্যবহৃত হয়। তবে এদের কাজ প্রায় একই রকম মনে হলেও, এদের মধ্যে কিছু পার্থক্য রয়েছে।


## নিচে এদের পার্থক্যগুলো দেওয়া হলো:

লেখার ধরনে কিছুটা পার্থক্য আছে। type ডিফাইন করার সময় একটি সমান চিহ্ন (=) ব্যবহার করতে হয়, যা interface এর ক্ষেত্রে লাগে না।

//interface

interface User {
  name: string;
  age: number;
}

//type:

type User = {
  name: string;
  age: number;
};


type  দিয়ে আমরা প্রিমিটিভ টাইপ, ইউনিয়ন টাইপ বা Tuple বা অবজেক্টের ডিফাইন করতে পারি কিন্তু interface শুধুমাত্র অবজেক্টের গঠন ডিফাইন করতে ব্যবহৃত হয়।

আমরা যদি একই নামে একাধিকবার interface ডিফাইন করি, তবে TypeScript সেগুলোকে অটোমেটিক্যালি একত্রে (Merge) করে ফেলে। কিন্তু type এর ক্ষেত্রে এটি এরর (Error) দেখায়।


//interface
এখানে আমরা পাবো name, age 
interface Person {
  name: string;
}

interface Person { 
  age: number;
}




//type
কিন্তু এখানে আমরা error পাবো।
type Person = {
  name: string;
};

type Person = {  
  age: number;
};


//interface
আর আমরা দুইটি interface একত্রে যুক্ত করতে পারি extends এর মাধ্যমে।
interface Animal {
  name: string;
}

interface Cat extends Animal {
  print(): void;
}


//type
আর আমরা দুইটি type কে যুক্ত করতে ব্যবহার করি ইন্টারসেকশন (&) চিহ্ন।
type Animal = {
  name: string;
};

type Cat = Animal & {
  print(): void;
};


so, এখান থেকে আমরা বুঝতে পারি যদি আমরা ওবজেক্ট তৈরি করি সে ক্ষেত্রে আমরা চাইলে interface উইস করতে পারি ,  আর অন্য ক্ষেত্রে type (Type Alias)।







# 2. Answer: 

TypeScript এর  union and intersection এর মাধ্যমে আমরা একবা একাধিকে data type একত্রে ব্যবহার করতে পারি। নিচে তার উদাহরণ দেওয়া হলো।

## Union Type (|) - "অথবা" (OR Logic):

Union Type ব্যবহার করা হয় যখন কোনো ভেরিয়েবলের মান একাধিক টাইপের মধ্যে যেকোনো একটি হতে পারে। একে "অথবা" (or) লজিক হিসেবে চিন্তা করতে পারি। এটি লেখার জন্য পাইপ চিহ্ন | ব্যবহার করা হয়।

উদাহরণ: ধরি, একটি ফাংশন আছে যা id নিবে। এই id কখনও নাম্বারে (যেমন: 101) আবার কখনও স্ট্রিং-এ (যেমন: "101") হতে পারে।

// এখানে id হতে পারে number অথবা string
function printId(id: number | string) {
  console.log(`ID is: ${id}`);
}

printId(101);       //ঠিক আছে (number)
printId("EMP-202"); // ঠিক আছে (string)
// printId(true);   //এরর দিবে (boolean এলাউড না)



## Intersection Type (&) - "এবং" (AND Logic):

Intersection Type ব্যবহার করা হয় একাধিক টাইপকে একত্রিত করে একটি নতুন টাইপ তৈরি করতে। এটি লেখার জন্য অ্যাম্পারস্যান্ড & চিহ্ন ব্যবহার করা হয়।


উদাহরণ: ধরি,  Person নামে একটি টাইপ আছে এবং Employee নামে আরেকটি টাইপ আছে। আমরা চাচ্ছি Staff নামক নতুন একটি টাইপ বানাতে যার মধ্যে উপরের দুটির সব গুণাগুণ থাকবে।


type Person = {
  name: string;
};

type Contact = {
  email: string;
  phone: number;
};

// দুটি টাইপকে একত্রিকরন।
type StaffProfile = Person & Contact;

// ব্যবহার
const newStaff: StaffProfile = {
  name: "Rahim",
  email: "rahim@example.com",
  phone: 1711000000 
  // এখানে সব প্রপার্টি (name, email, phone) থাকতেই হবে, 
  // কোনো একটি বাদ দিলেই এরর দিবে।
};
