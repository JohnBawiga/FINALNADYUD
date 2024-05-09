import './App.css';
import AdminNavbar from './Admin/Sidebar/AdminNavbar.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboards from './Admin/Pages/AdminDashboard.jsx';
import AdminEvents from './Admin/Pages/AdminEvents.jsx';
import AdminArticles from './Admin/Pages/AdminArticles.jsx';
import AdminTeachers from './Admin/Pages/AdminTeachers.jsx';
import AdminCreateAnnouncements from './Admin/Pages/AdminCreateAnnouncements.jsx';
import AdminCreateArticles from './Admin/Pages/AdminCreateArticle.jsx';
import AdminStudent from './zLandingpage/SplashScreen.jsx';
import AdminLogin from './zLandingpage/AdminLogin.jsx';
import StudentLogin from './zLandingpage/StudentLogin.jsx';
import StudentSignup from './zLandingpage/StudentSignup.jsx';
import AdminAnnouncements from './Admin/Pages/AdminAnnouncements.jsx';
import StudentNavbar from './Student/StudentNavbar/StudentNavbar.jsx'
import StudentHomepage from './Student/pages/StudentHomepage.jsx';
import StudentEvents from './Student/pages/StudentEvents.jsx';
import StudentArticles from './Student/pages/StudentArticles.jsx';
import StudentFaQs from './Student/pages/StudentFaQs.jsx';
import StudentProfile from './Student/pages/StudentProfile.jsx';
import AdminCreateEvent from './Admin/Pages/AdminCreateEvent.jsx'
import AssignTeachersToEvent from './Admin/Pages/AssignTeachersToEvent.jsx'
import AdminAddStudent from './Admin/Pages/AdminAddTeacher.jsx'
import AdminAddTeacher from './Admin/Pages/AdminAddTeacher.jsx';
import TeacherNavbar from './Teacher/Sidebar/TeacherNavbar.jsx';
import TeacherEvents from './Teacher/pages/TeacherEvents.jsx';
import TeacherAttendance from './Teacher/pages/TeacherAttendance.jsx';
import TeacherLogin from './zLandingpage/TeacherLogin.jsx'
import AddSection from './Admin/Pages/AddSection.jsx';
function App() {
  return (
        <Router>
          <Routes>
            <Route path='/' element={<AdminStudent />} />
            <Route path='/Admin/Login' element={<AdminLogin />} />
            <Route path='/Student/Login' element={<StudentLogin />} />
            <Route path='/Student/Signup' element={<StudentSignup />} />
            <Route path='Teacher/Login' element={<TeacherLogin/>}/>
            
            <Route path='/Admin/*' element={
              <>
                <AdminNavbar/>
                <Routes>
                  <Route path='/Dashboard/:adminID' element={<AdminDashboards />} />
                  <Route path='/Announcements/:adminID' element={<AdminAnnouncements />} />
                  <Route path='/Events/:adminID' element={<AdminEvents />} />
                  <Route path='/Articles/:adminID' element={<AdminArticles />} />
                  <Route path='/Teachers/:adminID' element={<AdminTeachers />} />
                  <Route path='/CreateAnnouncement/:adminID' element={<AdminCreateAnnouncements />}/>
                  <Route path='/CreateArticle/:adminID' element={<AdminCreateArticles />}/>
                  <Route path='/CreateEvent/:adminID' element={<AdminCreateEvent />}/>
                  <Route path='/AssignTeachers/:adminID' element={<AssignTeachersToEvent />}/>
                  <Route path='/AddStudent/:adminID' element={<AdminAddStudent />}/>
                  <Route path='/AddTeacher/:adminID' element={<AdminAddTeacher />}/>
                  <Route path='/AddSection/:adminID' element={<AddSection />}/>
                </Routes>
              </>
            } />
            
            <Route path='/Student/*' element={
              <>
                <StudentNavbar/>
                <Routes>
                  <Route path='/Homepage/:studentID' element={<StudentHomepage />} />
                  <Route path='/Events/:studentID' element={<StudentEvents />} />
                  <Route path='/Articles/:studentID' element={<StudentArticles />} />
                  <Route path='/FaQs/:studentID' element={<StudentFaQs />} />
                  <Route path='/Profile/:studentID' element={<StudentProfile />} />
                </Routes>
              </>
            } />
            <Route path='/Teacher/*' element={
              <>
              <TeacherNavbar/>
              <Routes>
                <Route path='/Events/:teacherID' element={<TeacherEvents />}/>
                <Route path='/Attendance/:teacherID/:eventID' element={<TeacherAttendance/>} />
              </Routes>
              </>
            }/>
          </Routes>
        </Router>
  );
}

export default App;