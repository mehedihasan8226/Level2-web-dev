# Vehicle Rental System (SQL Project)

##  Project Overview
The **Vehicle Rental System** is a relational database project designed to manage vehicle rentals.  
It allows administrators to manage users, vehicles, and bookings while enabling customers to book available vehicles.

This project demonstrates the use of:
- Database design
- Table relationships
- Constraints
- SQL queries with JOIN, GROUP BY, HAVING, EXISTS, and WHERE clauses

---

##  Database Creation

```sql
CREATE DATABASE "Vehicle-Rental-System";



-- Table create:

-- users table:
create table users(
  user_id serial primary key,
  role varchar(20) not null check (role in ('Admin', 'Customer')),
  name varchar(100) not null,
  email varchar(100) not null unique,
  password varchar(255) not null,
  phone varchar(16) not null,
  created_at timestamp default now()
  
)

  -- vehicles table:

create table vehicles(
  vehicle_id serial primary key,
  vehicle_name varchar(100) not null,
  type varchar(20) not null check (type in ('car', 'bike', 'truck')),
  model varchar(20) not null,
  registration_number varchar(100) not null,
  rental_price int not null,
  status varchar(20) not null check (status in ('available', 'rented', 'maintenance')),
  created_at timestamp default now()
)

  -- bookings table:

create table bookings(
  booking_id serial primary key,
  user_id int not null references users(user_id),
  vehicle_id int not null references vehicles(vehicle_id),
  start_date date not null,
  end_date date not null check (end_date > start_date),
  status varchar(20) not null check (status in ('pending', 'confirmed', 'completed', 'cancelled')),
 total_cost decimal(8,2) not null,
  created_at timestamp default now()
  
)


-- data insert:

insert into users (role, name, email, password, phone) values
('Admin', 'mehedi hasan', 'mehedi@gmail.com', 'hashed_password_1', '01711111111'),
('Customer', 'rahim uddin', 'rahim@gmail.com', 'hashed_password_2', '01722222222'),
('Customer', 'karim ali', 'karim@gmail.com', 'hashed_password_3', '01733333333'),
('Customer', 'sumaiya akter', 'sumaiya@gmail.com', 'hashed_password_4', '01744444444'),
('Customer', 'nabila islam', 'nabila@gmail.com', 'hashed_password_5', '01755555555');



insert into vehicles (vehicle_name, type, model, registration_number, rental_price, status) values
('toyota corolla', 'car', 'corolla 2020', 'dha-1234', 3000, 'available'),
('honda civic', 'car', 'civic 2019', 'dha-2345', 3500, 'available'),
('suzuki swift', 'car', 'swift 2018', 'dha-3456', 2500, 'maintenance'),
('nissan sunny', 'bike', 'sunny 2021', 'dha-4567', 2800, 'available'),
('mitsubishi lancer', 'truck', 'lancer 2017', 'dha-5678', 3200, 'rented');


insert into bookings (user_id, vehicle_id, start_date, end_date, status, total_cost) values
(2, 1, '2025-01-01', '2025-01-04', 'confirmed', 9000.00),
(3, 2, '2025-01-05', '2025-01-07', 'completed', 7000.00),
(4, 4, '2025-01-10', '2025-01-12', 'pending', 5600.00),
(5, 2, '2025-01-15', '2025-01-18', 'confirmed', 9600.00),
(2, 2, '2025-01-20', '2025-01-22', 'cancelled', 7000.00);



-- Query 1: Retrieve customer names along with the vehicles they booked

-- Explanation:
-- This query uses INNER JOIN to combine data from bookings, users, and vehicles tables.
-- It matches user_id and vehicle_id to display which customer booked which vehicle.


select
  u.name as "Customer name",
  v.vehicle_name as "Vehicle name"
from bookings b
join users u  on b.user_id = u.user_id
join vehicles v on b.vehicle_id = v.vehicle_id;



--Query 2: Find all vehicles that have never been booked.

-- Explanation: 
  -- This query uses EXISTS and NOT EXISTS to Find all vehicles that have never been booked.
  -- and for that I use where ande ont exists to filter the determine result.

select
  v.vehicle_id,
  v.vehicle_name,
  v.registration_number,
  v.status
from vehicles v
where not exists (
  select *
  from bookings b
  where b.vehicle_id = v.vehicle_id
);




--Query 3: Retrieve all available vehicles of a specific type (e.g. cars):

-- Explanation:
 -- This query useing WHERE to Retrieve all available vehicles of a specific type (e.g. cars).
 -- And for that I am using and oparator to filter the exact result.

select * from vehicles v
where status = 'available' and v.type ='car';




--Query 4: Find the total number of bookings 
-- for each vehicle and display only those vehicles that have more than 2 bookings.

-- Explanation:
 -- For this Querey using GROUP BY and HAVING to Find the total number of bookings for each 
 -- vehicle and display only those vehicles that have more than 2 bookings .

-- here need vehicles and bookings tabel to join becase of get vehicle_name and total_bookings ,
  -- and for the count of total_bookings using group by and having and geter than condition.
  


select
  v.vehicle_name,
  count(b.booking_id) as total_bookings
from vehicles v
join bookings b on v.vehicle_id = b.vehicle_id
group by v.vehicle_name
having count(b.booking_id) > 2;

