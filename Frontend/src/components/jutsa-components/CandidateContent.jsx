const CandidateContent = () => {
  return (
    <div className="p-4 border rounded my-4">
      <h2 class="text-base font-semibold text-black">Candidate Eligibility</h2>
      <div className="px-4 py-2">
        <ul className="list-disc">
          <li class="text-gray-700 list">
            Must be a student of the association
          </li>

          <li class="text-gray-700">Must have a minimum CGPA of 3.0</li>

          <li class="text-gray-700">
            Must have completed at least 4 semesters
          </li>

          <li class="text-gray-700">
            Must have a minimum of 2 years experience in the association
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CandidateContent;
