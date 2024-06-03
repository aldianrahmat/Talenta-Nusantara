import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch } from "react-icons/fi";

const MyJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    // Set current page
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    useEffect(() => {
        setIsLoading(true);
        fetch('http://localhost:5173/myJobs/HexaVibes@gmail.com')
            .then(res => res.json())
            .then(data => {
                setJobs(data);
                setIsLoading(false);
            });
    }, [searchText]);

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentJobs = jobs.slice(indexOfFirstItem, indexOfLastItem);

    // Next btn & previous btn
    const nextPage = () => {
        if (indexOfLastItem < jobs.length) {
            setCurrentPage(currentPage + 1);
        }
    }

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    const handleSearch = () => {
        const query = searchText.toLowerCase();
        const filtered = jobs.filter((job) => {
            const matchesTitle = job.jobTitle.toLowerCase().includes(query);
            const matchesLocation = job.jobLocation.toLowerCase().includes(query);
            return matchesTitle || matchesLocation;
        });

        return filtered;
    };

    const filteredJobs = handleSearch();

    // Function to delete a job
    const deleteJob = (id) => {
        fetch(`http://localhost:5173/my-job/${id}`, {
            method: "DELETE"
        }).then(res => res.json()).then(data => {
            if (data.acknowledged === true) {
                alert("Job Deleted Successfully!!!!");
                // Update the job list after deletion
                setJobs(jobs.filter(job => job.id !== id));
            }
        });
    };

    return (
        <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
            <div className="my-jobs-container">
                <h1 className="text-center p-4">Semua Pekerjaan Saya</h1>
                <div className="relative p-2 text-center mb-2">
                    <div className="relative inline-block lg:w-6/12 w-full">
                        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            onChange={(e) => setSearchText(e.target.value)}
                            type="text"
                            name="title"
                            id="job-title"
                            placeholder='Cari'
                            className="py-2 pl-10 pr-3 border focus:outline-none w-full"
                        />
                    </div>
                    <button
                        className="bg-blue text-white font-semibold px-8 py-2 rounded-sm mb-4 ml-4"
                        onClick={handleSearch}>Cari</button>
                </div>
            </div>

            <section className="py-1 bg-blueGray-50">
                <div className="w-full xl:w-10/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                    <h3 className="font-semibold text-base text-blueGray-700">Semua Pekerjaan Saya</h3>
                                </div>
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                                    <Link to="/post-job">
                                        <button className="bg-blue text-white active:bg-blue-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">Pasang Pekerjaan Baru</button>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="block w-full overflow-x-auto">
                            <table className="items-center bg-transparent w-full border-collapse">
                                <thead>
                                    <tr>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            No
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Nama Pekerjaan
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Nama Perusahaan
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Gaji
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Lokasi
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Tipe
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>

                                {isLoading ? (
                                    <div className="flex items-center justify-center h-20">
                                        <p>Loading.....</p>
                                    </div>
                                ) : (
                                    <tbody>
                                        {currentJobs.map((job, index) => (
                                            <tr key={index}>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                                                    {index + 1}
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {job.jobTitle}
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {job.companyName}
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {job.salaryType === 'annual'
                                                        ? `Rp.${job.minPrice}jt - Rp.${job.maxPrice}jt/Bln`
                                                        : `Rp.${job.minPrice}jt - Rp.${job.maxPrice}jt/Bln`}
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {job.jobLocation}
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {job.jobType}
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    <div className="relative inline-block text-left">
                                                        <button className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center">
                                                            <span className="mr-1">Aksi</span>
                                                            <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 7a1 1 0 011-1h1V5c0-1.1.9-2 2-2h6a2 2 0 012 2v1h1a1 1 0 011 1v2a1 1 0 01-1 1v7a2 2 0 01-2 2H6a2 2 0 01-2-2V10a1 1 0 01-1-1V7zm2-1v10a1 1 0 001 1h8a1 1 0 001-1V7H5zm5-4a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" /></svg>
                                                        </button>
                                                        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                                            <div className="py-1">
                                                                <button
                                                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                                    onClick={() => deleteJob(job.id)}>
                                                                    Hapus
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                )}
                            </table>
                        </div>
                    </div>

                    {/* Pagination */}
                    <div className="mt-4 flex justify-center">
                        <button
                            className="px-4 py-2 mx-1 bg-gray-200 text-gray-700 rounded-md"
                            onClick={prevPage}
                            disabled={currentPage === 1}>
                            Previous
                        </button>
                        <button
                            className="px-4 py-2 mx-1 bg-gray-200 text-gray-700 rounded-md"
                            onClick={nextPage}
                            disabled={indexOfLastItem >= jobs.length}>
                            Next
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MyJobs;