import React from 'react';

const Profile = () => {
  return (
    <section className="py-16 text-center">
      <h2 className="text-3xl font-bold">Profile</h2>
      <div className="mt-8 space-x-8">
        <div>
          <p><strong>Doğum Tarihi:</strong> 29.07.1999</p>
          <p><strong>İkamet Şehri:</strong> Bursa</p>
          <p><strong>Eğitim Durumu:</strong> Kocaeli Ünv.</p>
        </div>
        <div>
          <p><strong>About Me:</strong></p>
          <p>Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>
        </div>
      </div>
    </section>
  );
};

export default Profile;
